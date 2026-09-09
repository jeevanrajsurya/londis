// Fallback data for S&B Retail Our Products Hub and 5 Dedicated Subpages

export const fallbackOurProductsCms = {
  hub: {
    hero: {
      bgMediaUrl:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80',
      bgMediaType: 'image',
      badgeText: 'OUR PRODUCTS',
      title: 'Our Products',
      subtitle: '',
      overlayStyle: 'warm',
    },
    intro: {
      headline:
        'We carry beverages fit for energizing, satisfying, warming up, cooling down or just plain quenching your thirst',
      body:
        'We’ve got your food solutions, too - whether it’s for on-the-go, at work or anywhere in-between… treat time, lunch time, anytime! We’ll supply the everyday necessities for your fridge, your family, your first aid kit or your traveling tool box. Fuel up, oil up and tidy up your car. One stop at S&B Forecourt and you’re ready to take on your day. No matter why you’re stopping or who you’re with, just come as you are…we’ll be here ready and waiting for you!',
    },
    actionCards: [
      {
        id: 'card-thirst-stop',
        title: "America's\nTHIRST STOP!",
        subtitle:
          'Ice-cold fountain drinks, fresh barista coffee, froster slushies and ready-to-grab cold teas and juices.',
        imageUrl:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'blue',
        linkUrl: '/our-products/americas-thirst-stop',
        buttonText: 'More info →',
        badge: 'Drinks & Beverages',
        showDash: true,
      },
      {
        id: 'card-fresh-food',
        title: 'Fresh food,\nfast!',
        subtitle:
          'We’re the hot spot for tasty snacks and meals on the move. From hot dogs, artisan pizza, to sandwiches and salads, we’ve got your hunger covered.',
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'green',
        linkUrl: '/our-products/meal-deals',
        buttonText: 'More info →',
        badge: 'Hot Foods & Combos',
        showDash: true,
      },
      {
        id: 'card-easy-pay',
        title: 'Easy Pay',
        subtitle:
          'Easy to Save, Easy to Pay, Every Day, on Every Gallon! Link your S&B Easy Pay card to your checking account for the most secure, convenient way to fuel up and save up to 30¢/gal.',
        imageUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'white',
        linkUrl: '/our-products/easy-pay',
        buttonText: 'Read more →',
        badge: 'Save 30¢/gal',
        showDash: true,
      },
      {
        id: 'card-fleet',
        title: 'Fleet Card',
        subtitle:
          'Empower your commercial fleet with centralized fuel management, driver PIN security, monthly consolidated invoicing and tiered volume savings.',
        imageUrl:
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'white',
        linkUrl: '/our-products/business',
        buttonText: 'More info →',
        badge: 'B2B Solutions',
        showDash: true,
      },
      {
        id: 'card-quality-guaranteed',
        title: 'Quality\nguaranteed',
        subtitle:
          'When we say quality guaranteed fuel, we mean it. Top Tier™ detergent gasoline that cleans intake valves, protects engines, and enhances every mile.',
        imageUrl:
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'slate',
        linkUrl: '/our-products/qualityguaranteed',
        buttonText: 'More info →',
        badge: 'Top Tier™ Fuel',
        showDash: true,
      },
    ],
  },
  subpages: {
    // 1. America's Thirst Stop
    thirstStop: {
      hero: {
        title: 'WE DEFINITELY HAVE THAT',
        subtitle:
          'Thirsty? Chill out with an icy Polar Pop, grab an energy drink, or pour a steaming hot cup of bean-to-cup Arabica coffee.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Find your nearest station',
        buttonLink: '/contact',
      },
      locator: {
        title: 'Find your nearest store',
        placeholder: 'City & State or ZIP',
        buttonLink: '/contact',
      },
      featuredProducts: [
        {
          id: 'fp-1',
          name: 'NEW GHOST® Energy Strawbango',
          badge: 'NEW',
          description: 'Legendary energy and epic flavor with zero sugar and natural caffeine.',
          imageUrl:
            'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-2',
          name: 'NEW CELSIUS® Watermelon Ice',
          badge: 'REFRESHING',
          description: 'Essential energy formula packed with 7 essential vitamins and zero sugar.',
          imageUrl:
            'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-3',
          name: 'Sprite Cherry Polar Pop',
          badge: 'CUSTOMER FAVORITE',
          description: 'Ice-cold crisp Sprite with a burst of sweet cherry served in our 44oz cup.',
          imageUrl:
            'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-4',
          name: 'NEW EXCLUSIVE Gatorade® Summer Blaze',
          badge: 'EXCLUSIVE',
          description: 'Quench your deep thirst with rapid electrolyte hydration and bold fruit flavor.',
          imageUrl:
            'https://images.unsplash.com/photo-1543253687-c931c8e01820?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-5',
          name: 'MTN DEW® Summer Sparkler',
          badge: 'SUMMER HIT',
          description: 'Citrus blast soda chilled to perfection at our self-serve beverage center.',
          imageUrl:
            'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-6',
          name: 'Monster Energy Ultra Sunrise',
          badge: 'ZERO SUGAR',
          description: 'Light, crisp citrus orange flavor with full load of Monster energy blend.',
          imageUrl:
            'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
        },
      ],
      limitedTimeOffers: [
        {
          id: 'lto-1',
          title: "S'mores Coffee",
          description: 'Rich dark roast infused with sweet marshmallow, toasted graham, and melted milk chocolate.',
          imageUrl:
            'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'lto-2',
          title: "S'mores Hot Chocolate",
          description: 'Decadent creamy cocoa topped with campfire marshmallow notes and crunchy graham crumb topping.',
          imageUrl:
            'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'lto-3',
          title: 'Win Free Coffee For A Year',
          description: 'Scan your S&B Rewards barcode every time you brew in-store for automatic entries into our grand giveaway!',
          imageUrl:
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        },
      ],
      everydayClassics: [
        {
          id: 'ec-1',
          title: 'Award Winning Coffee',
          description: '100% Arabica beans freshly ground for each individual cup. Unmatched freshness in every sip.',
          imageUrl:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'ec-2',
          title: '100% Colombian Roast',
          description: 'Dark roasted Colombian beans create a full-bodied cup with caramel brown sugar notes and pleasant mocha finish.',
          imageUrl:
            'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'ec-3',
          title: 'Signature House Blend',
          description: 'Rich tasting and full-bodied, offering a harmonious balance of caramelized sweetness and chocolate aroma.',
          imageUrl:
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
        },
      ],
      disclaimer: '* Available at participating S&B Forecourt & C-Store locations across the United States.',
    },

    // 2. Meal Deals
    mealDeals: {
      hero: {
        title: 'MEAL DEALS',
        subtitle: 'Hungry? Choose Your Deal! Satisfying, high-value combos made fresh daily for drivers on the go.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Find your local store',
        buttonLink: '/contact',
      },
      dealTiers: [
        {
          id: 'tier-3-lunch',
          title: '$3 Meal Deal',
          description:
            'Includes a hot dog OR a taquito, 1oz-2oz bag of Frito-Lay chips, and any size Polar Pop (up to 44oz)',
          items: [
            {
              id: 'tier1-item-1',
              name: 'Grilled All-Beef Hot Dog',
              imageUrl:
                'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier1-item-2',
              name: 'Crispy Artisan Taquito',
              imageUrl:
                'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier1-item-3',
              name: 'Frito-Lay Chips (1-2oz)',
              imageUrl:
                'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier1-item-4',
              name: 'Any Size Polar Pop (up to 44oz)',
              imageUrl:
                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
        {
          id: 'tier-3-bakery',
          title: '$3 Morning Meal Deal',
          description:
            'Choose any 1 donut, pastry, brownie, muffin OR any cookie and any size Polar Pop (up to 44oz) OR a medium coffee',
          items: [
            {
              id: 'tier2-item-1',
              name: 'Donut, Pastry, Brownie, Muffin, or Cookie',
              imageUrl:
                'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier2-item-2',
              name: 'Medium Fresh Arabica Coffee',
              imageUrl:
                'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier2-item-3',
              name: 'Any Size Polar Pop (up to 44oz)',
              imageUrl:
                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
        {
          id: 'tier-4-breakfast',
          title: '$4 Meal Deal',
          description:
            'Choose from any of the following hot breakfast sandwiches. Add a hash brown and any energy drink (Monster, Red Bull, Celsius) OR a medium coffee OR any size Polar Pop (up to 44oz).',
          items: [
            {
              id: 'tier3-item-1',
              name: 'Sausage, Egg, & Cheese Croissant',
              imageUrl:
                'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-2',
              name: 'Sausage, Egg, & Cheese Biscuit',
              imageUrl:
                'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-3',
              name: 'Sausage, Egg, & Cheese English Muffin',
              imageUrl:
                'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-4',
              name: 'Ham, Egg, & Cheese Croissant',
              imageUrl:
                'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-5',
              name: 'Crispy Golden Hash Brown',
              imageUrl:
                'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-6',
              name: 'Monster, Red Bull & Celsius Drinks',
              imageUrl:
                'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-7',
              name: 'Medium Fresh Arabica Coffee',
              imageUrl:
                'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier3-item-8',
              name: 'Any Size Polar Pop (up to 44oz)',
              imageUrl:
                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
        {
          id: 'tier-5-combo',
          title: '$5 Meal Deal',
          description:
            'Includes an S&B Chargrilled Cheeseburger OR Chicken and Swiss, 1-2oz Frito-Lay chips, 20oz soda OR a Polar Pop (up to 44oz)',
          items: [
            {
              id: 'tier4-item-1',
              name: 'Chargrilled Cheese Burger',
              imageUrl:
                'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier4-item-2',
              name: 'Chicken and Swiss Sandwich',
              imageUrl:
                'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier4-item-3',
              name: 'Frito-Lay Chips (1-2oz)',
              imageUrl:
                'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier4-item-4',
              name: 'Any 20oz Soda Bottle',
              imageUrl:
                'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
            },
            {
              id: 'tier4-item-5',
              name: 'Any Size Polar Pop (up to 44oz)',
              imageUrl:
                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
            },
          ],
        },
      ],
      disclaimer: '* Prices and participation may vary by location. Applicable taxes not included. Available at participating S&B stores.',
    },

    // 3. Easy Pay
    easyPay: {
      hero: {
        title: 'Easy Pay: Your Gas Card Alternative for Everyday Savings',
        subtitle:
          'Sign up now to save 30¢ per gallon on your first 100 gallons or 60 days, then save at least 10¢ per gallon every single day!',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Enroll now',
        buttonLink: '/contact',
      },
      whatIs: {
        title: 'What is Easy Pay Debit?',
        cardVisualUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
        points: [
          {
            heading: 'A Simple Way to Pay at S&B',
            description:
              'Experience seamless transactions with Easy Pay, linking directly to your checking account for debit card-like convenience with no credit checks.',
          },
          {
            heading: 'Minimum 10¢ off per gallon',
            description:
              'Watch the savings roll in every time you swipe. After saving 30¢/gal in your first 60 days or 100 gallons, enjoy at least 10¢ off every gallon, every day.',
          },
          {
            heading: 'Secure Easy Pay with PIN',
            description:
              'Each Easy Pay transaction is protected by your personal unique 4-digit PIN, ensuring complete peace of mind whenever you fuel up.',
          },
        ],
        memberBox: {
          title: 'Already an Easy Pay member?',
          description:
            'Looking to log in to your account, check transaction history, or order replacement cards? Access the secure member portal.',
          buttonText: 'Log In to Account',
          buttonLink: '/contact',
        },
      },
      steps: [
        {
          stepNumber: 'Step 1',
          title: 'Get your Easy Pay Card',
          description:
            'Pick up an Easy Pay card at your local S&B Forecourt cashier counter. Not near a store? Request one during online enrollment and we’ll mail it to your home address!',
          imageUrl:
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
          ctaText: 'Enroll now',
          ctaLink: '/contact',
        },
        {
          stepNumber: 'Step 2',
          title: 'Link the card to your checking account',
          description:
            'Your Easy Pay card functions as a decoupled debit card. Following quick identity verification, securely connect your bank routing and account number.',
          imageUrl:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
          ctaText: '',
          ctaLink: '',
        },
        {
          stepNumber: 'Step 3',
          title: 'Receive and activate cards',
          description:
            'Visit any local store to activate your new Easy Pay card and save an introductory 30¢ per gallon on your first 60 days or 100 gallons. Enter your PIN to start saving!',
          imageUrl:
            'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
          ctaText: '',
          ctaLink: '',
        },
      ],
      faqs: [
        {
          category: 'General',
          question: 'How does Easy Pay work?',
          answer:
            'Easy Pay is an ACH debit card linked securely to your existing checking account. Funds are deducted directly from your bank like a check or debit card. No line of credit is opened, no credit checks are required, and your credit score is completely unaffected.',
        },
        {
          category: 'General',
          question: 'What is Easy Pay?',
          answer:
            'Easy Pay is a proprietary debit card for S&B Forecourt customers. It gives you automatic fuel rollbacks and instant in-store savings without credit card interest fees.',
        },
        {
          category: 'General',
          question: 'What are the benefits of Easy Pay?',
          answer:
            'You save 30¢ per gallon during your introductory period (up to 100 gallons or 60 days), and a guaranteed minimum of 10¢ off every gallon thereafter, every day.',
        },
        {
          category: 'Enrollment',
          question: 'What do I need to enroll in Easy Pay?',
          answer:
            'You need a valid US checking account and a valid Driver’s License or State ID. You can pick up a physical card in-store or request one by mail during enrollment.',
        },
        {
          category: 'Enrollment',
          question: 'How long will it take for an Easy Pay card to arrive by mail?',
          answer:
            'Mailed cards typically arrive within 7–10 business days. Picking up a free card in-store is the fastest way to start saving immediately.',
        },
        {
          category: 'Security',
          question: 'Is my bank information safe with Easy Pay?',
          answer:
            'Yes. All banking connections use bank-grade 256-bit encryption. Your card is secured with a unique 4-digit PIN that must be entered at every pump transaction.',
        },
        {
          category: 'Security',
          question: 'Do you run a credit check?',
          answer:
            'No. We never perform credit checks or inquire with credit bureaus.',
        },
      ],
    },

    // 4. Business Fleet
    businessFleet: {
      hero: {
        title: 'A smarter way to fuel your fleet. Savings start at 10¢*',
        subtitle:
          'With S&B Pro fleet cards and digital fleet solutions, you can cut fuel costs, simplify fleet expense management and prevent driver fraud.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Get your personal quote',
        buttonLink: '/contact',
        secondaryButtonText: 'Apply for Fleet Card',
        secondaryButtonLink: '/contact',
      },
      offerRibbon:
        'Enroll your fleet today and save 10¢ per gallon for 6 months* – Take advantage of this limited time offer.',
      optimizationFeatures: [
        {
          id: 'opt-1',
          title: 'Drive more. Pay less.',
          description: 'Save up to $40 a month per vehicle with tiered volume fuel rebates.',
          iconName: 'DollarSign',
        },
        {
          id: 'opt-2',
          title: "We've got your back, 24/7",
          description: '24/7 US-based commercial support and roadside assistance at your service.',
          iconName: 'Headphones',
        },
        {
          id: 'opt-3',
          title: 'Fuel anywhere',
          description: 'Fill up at thousands of S&B Forecourts and partner locations nationwide.',
          iconName: 'MapPin',
        },
      ],
      fleetSolutions: [
        {
          id: 'sol-1',
          leadingTag: 'For exclusive fueling',
          title: 'Fleet Card',
          priceText: 'No monthly card fees',
          benefits: [
            'Save +10¢ per gallon*',
            'All S&B Forecourt fuel stations',
            'Physical tamper-resistant card',
            'Fuel & Car Wash authorized',
            'Fleet spend analytics & odometer tracking',
          ],
          imageUrl:
            'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
          applyLink: '/contact',
          learnMoreLink: '/contact',
        },
        {
          id: 'sol-2',
          leadingTag: 'For maximized fueling options',
          title: 'Universal Card',
          priceText: 'Low monthly card fee',
          benefits: [
            'Save +10¢ per gallon at S&B stations*',
            'Accepted at 95% of fuel retailers nationwide',
            'Physical magnetic & chip card',
            'Fuel, Car Wash, and service maintenance',
            'Consolidated multi-network reporting',
          ],
          imageUrl:
            'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80',
          applyLink: '/contact',
          learnMoreLink: '/contact',
        },
        {
          id: 'sol-3',
          leadingTag: 'If you want to go fully digital',
          title: 'Digital+',
          priceText: 'Monthly subscription charge',
          benefits: [
            'Save +10¢ per gallon*',
            'Runs on contactless digital acceptance',
            'Pay directly from the mobile app',
            'Fuel, Tolls, EV and Car Wash',
            'Instant driver onboarding in seconds',
          ],
          imageUrl:
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
          applyLink: '/contact',
          learnMoreLink: '/contact',
        },
      ],
      supportBanner: {
        title: 'Still not sure which product is best for you?',
        description:
          'S&B Pro has a dedicated network of commercial fueling experts ready to analyze your fleet mileage and configure the best savings plan.',
        buttonText: 'Fill contact form',
        buttonLink: '/contact',
        imageUrl:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      },
      faqs: [
        {
          question: 'How can I find S&B locations near me for my fleet?',
          answer:
            'Use our interactive Store Locator or fleet manager app to view all diesel high-flow dispensers, DEF at pump, and commercial fueling lanes.',
        },
        {
          question: 'How do driver PINs prevent fraud?',
          answer:
            'Every driver is assigned a unique PIN and prompted for odometer readings at the pump. Cards can be locked to fuel-only and restricted to specific vehicle tank capacities.',
        },
        {
          question: 'How does tax-exempt reporting work?',
          answer:
            'If your organization is tax-exempt (non-profit, municipality, educational), our portal automatically credits state and federal excise taxes on every monthly statement.',
        },
        {
          question: 'What are the volume rebates?',
          answer:
            'Rebates scale up to 8¢/gal based on monthly gallons consumed across your fleet, applied as a statement credit automatically.',
        },
      ],
    },

    // 5. Quality Guaranteed Fuel
    qualityGuaranteed: {
      hero: {
        title: 'Best-in-class fuel services',
        subtitle:
          'Top Tier™ certified gasoline that cleans intake valves, protects your engine against deposit buildup, and maximizes fuel economy.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Find your local station',
        buttonLink: '/contact',
      },
      locator: {
        title: 'Find your local S&B station here',
        placeholder: 'City & State or ZIP',
        buttonLink: '/contact',
      },
      commitment: {
        title: 'Quality Guaranteed',
        p1: 'We guarantee our fuel is of high grade quality that meets and exceeds all EPA standards. We are committed to best-in-class fuel services and provide an easy fueling experience for our customers. We only use fuel sourced from responsible refineries and terminals that use 3x detergent additives. This means lower vehicle emissions and maintenance of optimal engine performance.',
        p2: 'When we say quality guaranteed, we mean it. We strive to deliver a quality customer experience every time. That’s why if you do run into an issue with our fuel, we guarantee to work with you to fix the issue and have you back on the road as quickly as possible.',
      },
      showcaseImage1:
        'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
      problemSteps: {
        heading: 'If you do experience a problem with our S&B fuel, please follow these easy steps:',
        steps: [
          'Call our 1-800-555-SANDB customer service line within 2 days of the fueling incident.',
          'Our team will provide information regarding required support documentation (receipt and technician inspection).',
          'When satisfactory support documentation is provided, we will work with you on full reimbursement of necessary repairs attributable to our fuel.*',
        ],
        disclaimer:
          '* S&B Retail investigates all claims and reserves the right to reject any claim not supported by appropriate verified documentation.',
        supportTitle: 'Customer Care Line',
        supportPhone: '1-800-555-SANDB (1-800-555-7263)',
      },
      showcaseImage2:
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      faqs: [
        {
          question: 'Why should I choose S&B fuels?',
          answer:
            'When we say quality guaranteed, we mean it. Our fuel contains 3x more cleaning detergent than standard minimum requirements, keeping fuel injectors clean, lowering emissions, and enhancing engine longevity.',
        },
        {
          question: 'What if I have a problem with S&B fuel?',
          answer:
            'We stand behind our fuel 100%. Call our 24/7 customer care line within 2 days at 1-800-555-SANDB, submit simple verification documents, and we will reimburse qualifying repair costs.',
        },
        {
          question: 'Does S&B fuel meet EPA and Top Tier standards?',
          answer:
            'Yes. All S&B unleaded and premium blends meet strict Top Tier™ detergent gasoline specifications, certified to prevent carbon deposit accumulation in modern gasoline direct-injection (GDI) engines.',
        },
        {
          question: 'Do you filter fuel at the dispenser?',
          answer:
            'Every dispensing bay is equipped with dual-stage 10-micron water-blocking filters to ensure that only clean, sediment-free fuel enters your fuel tank.',
        },
      ],
    },
  },
};
