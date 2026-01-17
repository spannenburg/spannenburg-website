import { defineField, defineType } from 'sanity'
import { TfiReceipt } from 'react-icons/tfi'

export const sale = defineType({
  name: 'sale',
  title: 'Sales & Orders',
  type: 'document',
  icon: TfiReceipt,
  fields: [
    // --- 1. STATUS & KANAAL ---
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: '🟢 New Inquiry / Draft', value: 'inquiry' },
          { title: '🟠 Reserved / Awaiting Payment', value: 'reserved' },
          { title: '🔵 Paid / In Production', value: 'paid' },
          { title: '🟣 Shipped', value: 'shipped' },
          { title: '🏁 Completed', value: 'completed' },
          { title: '❌ Cancelled', value: 'cancelled' },
        ],
        layout: 'radio'
      },
      initialValue: 'inquiry',
    }),
    defineField({
      name: 'salesChannel',
      title: 'Sales Channel',
      type: 'string',
      options: {
        list: [
            { title: 'Online (Website)', value: 'online' },
            { title: 'Gallery / Offline', value: 'gallery' },
            { title: 'Art Fair', value: 'fair' }
        ]
      },
      initialValue: 'online'
    }),
    defineField({
      name: 'orderDate',
      title: 'Date of Sale',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    // --- 2. DE KLANT ---
    defineField({
      name: 'customer',
      title: 'Customer Details',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Full Name' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'address', type: 'text', title: 'Billing/Shipping Address' },
      ]
    }),

    // --- 3. HET KUNSTWERK ---
    defineField({
      name: 'artwork',
      title: 'Purchased Artwork',
      type: 'reference',
      to: [{ type: 'artwork' }],
      validation: (Rule) => Rule.required(),
    }),
    
    // Omdat een artwork meerdere maten heeft, moeten we tekstueel opslaan wat er gekocht is
    // Anders raakt de historie corrupt als je later maten aanpast.
    defineField({
      name: 'selectedEditionName',
      title: 'Selected Edition (Snapshot)',
      description: 'E.g. "Landscape 120x80"',
      type: 'string', 
      validation: (Rule) => Rule.required(),
    }),

    // --- 4. HET NUMMER ---
    defineField({
      name: 'editionNumber',
      title: 'Assigned Edition Number',
      description: 'Which specific number gets assigned? (e.g. 3 of 6)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAP',
      title: 'Is Artist Proof?',
      type: 'boolean',
      initialValue: false,
    }),

    // --- 5. FINANCIEEL ---
    defineField({
      name: 'priceSold',
      title: 'Sold Price (EUR)',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      customer: 'customer.name',
      artwork: 'artwork.title',
      status: 'status',
      number: 'editionNumber',
      channel: 'salesChannel'
    },
    prepare({ customer, artwork, status, number, channel }) {
      const icons = { inquiry: '🟢', reserved: '🟠', paid: '🔵', shipped: '🟣', completed: '🏁', cancelled: '❌' };
      const statusIcon = icons[status as keyof typeof icons] || '⚪';
      const channelLabel = channel === 'online' ? '🌐' : '🏛️';

      return {
        title: `${statusIcon} ${customer || 'Unknown Customer'}`,
        subtitle: `${channelLabel} ${artwork} | Ed: #${number}`,
        media: TfiReceipt
      }
    }
  }
})
