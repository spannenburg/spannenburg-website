import { defineField, defineType } from 'sanity'
import { TfiReceipt, TfiWallet, TfiCommentAlt } from 'react-icons/tfi'

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
        { name: 'vatNumber', type: 'string', title: 'VAT Number (Business only)' },
      ]
    }),

    // --- 3. HET KUNSTWERK & EDITIE ---
    defineField({
      name: 'artwork',
      title: 'Purchased Artwork',
      type: 'reference',
      to: [{ type: 'artwork' }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'selectedSize',
      title: 'Selected Size',
      description: 'Select the standard size.',
      type: 'reference',
      to: [{ type: 'sizeTemplate' }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'editionNumber',
      title: 'Assigned Edition Number',
      description: '⚠️ Check inventory first! Enter the specific number (e.g. 3).',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isAP',
      title: 'Is Artist Proof (AP)?',
      type: 'boolean',
      initialValue: false,
    }),

    // --- 4. PRODUCTIE & WENSEN ---
    defineField({
        name: 'production',
        title: 'Production & Wishes',
        type: 'object',
        options: { collapsible: false },
        fields: [
            defineField({
                name: 'material',
                title: 'Print Material',
                type: 'reference',
                to: [{ type: 'material' }],
                options: { disableNew: true },
            }),
            defineField({
                name: 'remarks',
                title: 'Customer Wishes / Framing / Notes',
                description: 'E.g. "Walnut box frame, Museum Glass, Delivery after June 1st".',
                type: 'text',
                rows: 3,
                icon: TfiCommentAlt
            })
        ]
    }),

    // --- 5. FACTUUR DATA (VERSIMPELD) ---
    defineField({
      name: 'financials',
      title: 'Invoice Data (Inputs only)',
      description: 'Enter the FINAL amounts to be invoiced. No calculations here.',
      type: 'object',
      icon: TfiWallet,
      options: { collapsible: false },
      fields: [
        // Gewoon de 3 componenten van de factuur
        defineField({
            name: 'amountArtwork',
            title: 'Artwork Price (Netto)',
            description: 'The agreed price for the print itself (after any discounts).',
            type: 'number',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'amountFraming',
            title: 'Framing / Finishing Costs',
            description: 'Total cost for framing, glass, mounting.',
            type: 'number',
            initialValue: 0
        }),
        defineField({
            name: 'amountShipping',
            title: 'Shipping / Crating Costs',
            type: 'number',
            initialValue: 0
        }),

        // BTW en Notities
        defineField({
            name: 'vatRate',
            title: 'VAT Rate',
            type: 'string',
            options: {
                list: [
                    { title: '21% (Standard)', value: '21' },
                    { title: '9% (Low)', value: '9' },
                    { title: '0% (Export/Business)', value: '0' },
                ]
            },
            initialValue: '9'
        }),
        defineField({
            name: 'calculationNotes',
            title: 'Internal Notes on Price',
            description: 'Why is this the price? (e.g. "Given 10% fair discount", "Includes special glass").',
            type: 'text',
            rows: 2
        })
      ]
    }),
  ],
  preview: {
    select: {
      customer: 'customer.name',
      artwork: 'artwork.title',
      status: 'status',
      number: 'editionNumber',
      price: 'financials.amountArtwork',
      extra: 'financials.amountFraming',
      transport: 'financials.amountShipping',
      size: 'selectedSize.width',
    },
    prepare({ customer, artwork, status, number, price, extra, transport, size }) {
      const icons = { inquiry: '🟢', reserved: '🟠', paid: '🔵', shipped: '🟣', completed: '🏁', cancelled: '❌' };
      const statusIcon = icons[status as keyof typeof icons] || '⚪';
      
      const totalEstim = (price || 0) + (extra || 0) + (transport || 0);
      
      const sizeText = size ? ` | ${size}cm` : '';
      const priceText = totalEstim ? ` | Total: €${totalEstim}` : '';

      return {
        title: `${statusIcon} ${customer || 'New Order'}`,
        subtitle: `${artwork} (#${number})${sizeText}${priceText}`,
        media: TfiReceipt
      }
    }
  }
})
