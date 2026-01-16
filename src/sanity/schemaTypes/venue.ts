defineField({
      name: 'type',
      title: 'Venue Type',
      description: 'Select the official category. This is used for JSON-LD structured data to boost GEO-authority.',
      type: 'string',
      group: 'general',
      options: {
        list: [
          // Commercial & Professional
          { title: 'Art Gallery', value: 'ArtGallery' },
          { title: 'International Bank / Financial Inst.', value: 'FinancialService' },
          { title: 'Store / Salespoint', value: 'Store' },
          { title: 'Local Business / Corporate Office', value: 'LocalBusiness' },
          
          // Institutional & Culture
          { title: 'Museum', value: 'Museum' },
          { title: 'Government Building (e.g. City Hall)', value: 'GovernmentBuilding' },
          { title: 'Foundation / NGO', value: 'NGO' },
          { title: 'Educational Organization (Academy/Uni)', value: 'EducationalOrganization' },
          { title: 'Library', value: 'Library' },
          { title: 'Institution (General)', value: 'Organization' },
          
          // Events & Public
          { title: 'Art Fair', value: 'Event' },
          { title: 'Festival (Cultural Event)', value: 'Festival' },
          { title: 'Public Park / Outdoor', value: 'Park' },
          { title: 'Church / Religious Building', value: 'PlaceOfWorship' },
          
          // Private & Hospitality
          { title: 'Hotel', value: 'Hotel' },
          { title: 'Private Residence / Studio', value: 'Residence' },
          { title: 'Other / General Place', value: 'Place' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
