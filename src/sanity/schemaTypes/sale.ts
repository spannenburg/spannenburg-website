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
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: 'name', type: 'string', title: 'Full Name' },
        { name: 'email', type: 'string', title: 'Email' },
        { name: 'phone', type: 'string', title: 'Phone' },
        { name: 'address', type: 'text', title: 'Billing/Shipping Address' },
      ]
    }),

    // --- 3. HET KUNSTWERK & EDITIE ---
    defineField({
      name: 'artwork',
      title: 'Purchased Artwork',
      type: 'reference',
      to: [{ type: 'artwork' }],
      validation: (Rule) => Rule.required(),
    }),
    
    // AANPASSING 1: Dropdown naar je Size Templates (Veiliger dan typen)
    defineField({
      name: 'selectedSize',
      title: 'Selected Size',
      description: 'Choose the size template intended for this print.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      validation: (Rule) => Rule.required(),
    }),

    // AANPASSING 2: Nummer keuze (Handmatig invoeren, maar duidelijk)
    defineField({
      name: 'editionNumber',
      title: 'Assigned Edition Number',
      description: '⚠️ Check the artwork inventory first! Enter the specific number (e.g. 3).',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAP',
      title: 'Is Artist Proof (AP)?',
      type: 'boolean',
      initialValue: false,
    }),

    // --- 4. PRODUCTIE & UITVOERING (NIEUW) ---
    defineField({
        name: 'production',
        title: 'Production & Finish',
        type: 'object',
        options: { collapsible: false },
        fields: [
            // Dropdown naar je Materialen (Veiliger dan typen)
            defineField({
                name: 'material',
                title: 'Print Material',
                type: 'reference',
                to: [{ type: 'material' }],
                description: 'Which paper/material is used?'
            }),
            // Vrij veld voor lijstwerk
            defineField({
                name: 'framing',
                title: 'Framing / Mounting Details',
                type: 'text',
                rows: 2,
                placeholder: 'E.g. Walnut box frame, Museum Glass, Dibond mount...'
            })
        ]
    }),

    // --- 5. FINANCIEEL ---
    defineField({
      name: 'priceSold',
      title: 'Sold Price (EUR)',
      description: 'Final agreed price (excl. VAT if applicable)',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      customer: 'customer.name',
      artwork: 'artwork.title',
      status: 'status',
      number: 'editionNumber',
      size: 'selectedSize.width', // We pakken even breedte voor de preview
      material: 'production.material.name'
    },
    prepare({ customer, artwork, status, number, size, material }) {
      const icons = { inquiry: '🟢', reserved: '🟠', paid: '🔵', shipped: '🟣', completed: '🏁', cancelled: '❌' };
      const statusIcon = icons[status as keyof typeof icons] || '⚪';
      
      const sizeText = size ? ` | Size: ${size}cm` : '';
      const matText = material ? ` on ${material}` : '';

      return {
        title: `${statusIcon} ${customer || 'New Order'}`,
        subtitle: `${artwork} (#${number})${sizeText}${matText}`,
        media: TfiReceipt
      }
    }
  }
})
