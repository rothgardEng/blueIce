const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword } = require("../Lib/auth/auth.js");

async function seedDatabase() {
  try {
    const samplePassword = await hashPassword(process.env.USER_SECRET);
    // seeding admins
    await prisma.admin.createMany({
      data: [
        {
          firstName: "Bob",
          lastName: "Jones",
          hashedPassword: samplePassword,
          email: "example@gmail.com",
          isOverlord: true
        },
        {
          firstName: "Seth",
          lastName: "Kylar",
          hashedPassword: samplePassword,
          email: "example2@gmail.com",
          isOverlord: false
        }
      ],
      skipDuplicates: true // Skip 'Bobo'
    });

    // joinUs
    await prisma.joinUs.createMany({
      data: [
        {
          name: "Zach Carterdfgf",
          email: "singupExampdle@gmail.com",
          phoneNumber: "(234) 567-8910",
          memberships: "La Colectiva",
          interested: "board meetings",
          referral: "DSA",
          contacted: false,
          contactedBy: null,
          hasParticipatedInAction: false
        },
        {
          name: "chris smith",
          email: "singupEle@gmail.com",
          phoneNumber: "(234) 567-8910",
          memberships: "La Colectiva",
          interested: "board meetings",
          referral: "la colectiva",
          contacted: true,
          contactedBy: "Bob Jones",
          hasParticipatedInAction: true
        },
        {
          name: "john doe",
          email: "singsdfdsfdsupExample@gmail.com",
          phoneNumber: "(234) 567-8910",
          memberships: "La Colectiva",
          interested: "board meetings",
          referral: "DSA",
          contacted: true,
          assignedTo: "Chris Thornburg",
          contactedBy: "Chris Thornburg",
          hasParticipatedInAction: false
        },
        {
          name: "maya harry",
          email: "singusdfdsfdspExample@gmail.com",
          phoneNumber: "(234) 567-8910",
          memberships: "La Colectiva",
          interested: "board meetings",
          referral: "DSA",
          contacted: false,
          contactedBy: null,
          hasParticipatedInAction: false
        },
        {
          name: "oliver clovesoff",
          email: "singusdfdsfdspExample@gmail.com",
          phoneNumber: "(234) 567-8910",
          memberships: "La Colectiva",
          interested: "board meetings",
          referral: "DSA",
          contacted: false,
          contactedBy: null,
          hasParticipatedInAction: false
        },
        {
          name: "beth larry",
          email: "singupExsdfdsfdsample@gmail.com",
          phoneNumber: "(234) 567-8910",
          memberships: "La Colectiva",
          interested: "board meetings",
          referral: "DSA",
          contacted: false,
          contactedBy: null,
          hasParticipatedInAction: false
        }
      ],
      skipDuplicates: true
    });

    // news
    await prisma.news.createMany({
      data: [
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/luffyBlackCoat.avif",
          imageAlt: "luffy looking cool af",
          imageAltSpanish: "luffy se ve genial",
          title: "Luffy looking bad af",
          titleSpanish: "la title en espanol",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          bodySpanish: "el espanol text",
          typeA: "Call To Action",
          link: "https://www.pinterest.com/pin/976718237915845972/",
          anon: true,
          createdBy: "Chris Thornburg"
          // createdAt: "03/29/24",
          // updatedAt: "03/30/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/luffyGear2.jfif",
          imageAlt: "Image 1 description",
          imageAltSpanish: "imagen 1 descripción",
          typeA: "Call To Action",
          title: "Title for News 1",
          titleSpanish: "la title en espanol",
          body: "Body text for News 1... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          bodySpanish: "el espanol text",
          link: "https://wallpapers.com/images/featured/luffy-pictures-22osajj9ivjfcm49.jpg",
          anon: false,
          createdBy: "John Doe"
          // createdAt: "03/28/24",
          // updatedAt: "03/29/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/luffyGear3.jpg",
          imageAlt: "Image 2 description",
          imageAltSpanish: "imagen 2 descripción",
          title: "Title for News 2",
          titleSpanish: "la title en espanol",
          typeA: "Call To Action",
          body: "Body text for News 2... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          bodySpanish: "el espanol text",
          link: "https://example.com/news2",
          anon: true,
          createdBy: "Jane Smith"
          // createdAt: "03/27/24",
          // updatedAt: "03/28/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/luffyRedShirt.avif",
          imageAlt: "Image 3 description",
          imageAltSpanish: "imagen 3 descripción",
          title: "Title for News 3",
          titleSpanish: "la title en espanol",
          typeA: "Call To Action",
          body: "Body text for News 3... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          bodySpanish: "el espanol text",
          link: "https://example.com/news3",
          anon: false,
          createdBy: "Emily Brown"
          // createdAt: "03/26/24",
          // updatedAt: "03/27/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/luffyWaterColorTall.jpg",
          imageAlt: "Image 4 description",
          imageAltSpanish: "imagen 4 descripción",
          title: "Title for News 4",
          titleSpanish: "la title en espanol",
          typeA: "Call To Action",
          body: "Body text for News 4... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          bodySpanish: "el espanol text",
          link: "https://example.com/news4",
          anon: true,
          createdBy: "Robert Johnson"
          // createdAt: "03/25/24",
          // updatedAt: "03/26/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/zoro.jpeg",
          imageAlt: "Image 5 description",
          imageAltSpanish: "imagen 5 descripción",
          title: "Title for News 5",
          typeA: "Call To Action",
          titleSpanish: "la title en espanol",
          body: "Body text for News 5... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          bodySpanish: "el espanol text",
          link: "https://example.com/news5",
          anon: false,
          createdBy: "Susan Williams"
          // createdAt: "03/24/24",
          // updatedAt: "03/25/24"
        }
      ],
      skipDuplicates: true
    });

    // recoomendations
    await prisma.recommendation.createMany({
      data: [
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/womanRaceAndClass.jpg",
          imageAlt: "Big Bold black letters with a bronzy gold background",
          imageAltSpanish: "Spanish alt text 1",
          title: "Woman race and class",
          titleSpanish: "espanole Titel",
          bodySpanish: "la text in espanol",
          genre: "Biography",
          typeA: "Book",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          link: "https://www.pinterest.com/pin/976718237915845972/",
          anon: true,
          createdBy: "Chris Thornburg",
          author: "Angela Davis"
          // createdAt: "03/29/24",
          // updatedAt: "03/30/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/theEndofPolicingSquare.jpg",
          imageAlt: "Image 1 description",
          imageAltSpanish: "Spanish alt text 2",
          title: "The End of Policing",
          titleSpanish: "espanole Titel",
          bodySpanish: "la text in espanol",
          genre: "Biography",
          typeA: "Book",
          body: "Body text for News 1... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          link: "https://wallpapers.com/images/featured/luffy-pictures-22osajj9ivjfcm49.jpg",
          anon: false,
          createdBy: "John Doe",
          author: "Alex Vitale"
          // createdAt: "03/28/24",
          // updatedAt: "03/29/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/becomingAbolitionistis.jpg",
          imageAlt: "Image 2 description",
          imageAltSpanish: "Spanish alt text 3",
          title: "Becoming Abolistionist",
          titleSpanish: "espanole Titel",
          bodySpanish: "la text in espanol",
          genre: "Biography",
          typeA: "Book",
          body: "Body text for News 2... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          link: "https://example.com/news2",
          anon: true,
          createdBy: "Jane Smith",
          author: "Derecka Purnell"
          // createdAt: "03/27/24",
          // updatedAt: "03/28/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/the-new-jim-crow-with-border.jpg",
          imageAlt: "Image 3 description",
          imageAltSpanish: "Spanish alt text 4",
          title: "The new jim crow",
          typeA: "Book",
          titleSpanish: "espanole Titel",
          bodySpanish: "la text in espanol",
          genre: "Biography",
          body: "Body text for News 3... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          link: "https://example.com/news3",
          anon: false,
          createdBy: "Emily Brown",
          author: "Michelle Alexander"
          // createdAt: "03/26/24",
          // updatedAt: "03/27/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/weDoThisTillWeFreeUs.jpg",
          imageAlt: "Image 4 description",
          imageAltSpanish: "Spanish alt text 5",
          title: "we do this 'til we free us   ",
          titleSpanish: "espanole Titel",
          bodySpanish: "la text in espanol",
          genre: "Biography",
          typeA: "Book",
          body: "Body text for News 4... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          link: "https://example.com/news4",
          anon: true,
          createdBy: "Robert Johnson",
          author: "Mariame Kaba"
          // createdAt: "03/25/24",
          // updatedAt: "03/26/24"
        },
        {
          imageLink:
            "https://defund-nova-police.s3.us-east-1.amazonaws.com/forWebsite/TheRiseOfWarriorCop.jpg",
          imageAlt: "Image 5 description",
          imageAltSpanish: "Spanish alt text 6",
          title: "The rise of the warrior cop",
          titleSpanish: "espanole Titel",
          typeA: "Book",
          bodySpanish: "la text in espanol",
          genre: "Biography",
          body: "Body text for News 5... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. EPIC CENTRIEST MOMENT",
          link: "https://example.com/news5",
          anon: false,
          createdBy: "Susan Williams",
          author: "Radley Balko"
          // createdAt: "03/24/24",
          // updatedAt: "03/25/24"
        }
      ],
      skipDuplicates: true
    });

    // orgs
    await prisma.orginization.createMany({
      data: [
        {
          orgName: "DSA NOVA",
          imageLink: "/images/coalition/DSA_NOVA.jpg",
          imageAlt: "DSA NOVA Branch logo",
          imageAltSpanish: "spanish dsa",
          english:
            "DSA organizes to build workplace democracy, demand a right to housing, confront immigration detention profiteers, stand up to Amazon, ensure a just transition, and fight fascism. DSA is ever-evolving to confront the challenges presented by capitalism, fascism, and systemic inequality.",
          spanish:
            "Los Socialistas Democraticos de América (DSA) organizan para crear democracia en los lugares de empleo, demandar el derecho a la vivienda, enfrentarse a los que se aprovechan de las detenciones migratorias, resistir a Amazon, asegurar una transición justa, y pelear contra el fascismo. DSA constantemente evoluciona para confrontar los desafíos presentados por el capitalismo, fascismo, y la desigualdad sistémica.",
          twitter: "https://twitter.com/dsa_nova",
          instagram: "https://www.instagram.com/mdc_dsa/",
          facebook: "https://www.facebook.com/NOVADSA/",
          website: "https://mdcdsa.org/"
        },
        {
          orgName: "La ColectiVA",
          imageLink: "/images/coalition/La_Colectiva.png",
          imageAlt: "LA Colectiva logo",
          imageAltSpanish: "spanish la colcitva",
          english:
            "La ColectiVA is an inclusive collaborative led by gente Latinx who are committed to upholding social justice and equity.",
          spanish:
            "La ColectiVA es una colaborativa inclusiva liderada por gente Latinx que están comprometidas a defender la justicia social y la equidad.",
          twitter: "https://twitter.com/lacolectiva703",
          instagram: "https://www.instagram.com/lacolectiva703/",
          facebook: "https://www.facebook.com/LaColectiVA703/",
          website: "https://lacolectiva.org/"
        },
        {
          orgName: "SURJ",
          imageLink: "/images/coalition/SURJ.jpg",
          imageAlt: "SURJ logo",
          imageAltSpanish: "spanish Surj",
          english:
            "Showing Up for Racial Justice (SURJ) Northern Virginia is a chapter of a national network of groups and individuals organizing white people for racial justice. Through community organizing, mobilizing, and education, SURJ moves white people to act as part of a multiracial movement for justice with passion and accountability. We work to connect people across Northern Virginia while supporting and collaborating with local and national racial justice organizing efforts.",
          spanish:
            "Showing Up for Racial Justice (SURJ) del Norte de Virginia es una sección de una red nacional de grupos e individuales organizando a gente blanca para la justicia racial. A través de organización, movilización, y educación, SURJ mueve a gente blanca a actuar como parte de un movimiento multiracial hacia la justicia con pasión y responsabilidad.Trabajamos para conectar a gente por todo el Norte de Virginia mientras que apoyamos y colaboramos con esfuerzos de justicia racial locales y nacionales.",
          twitter: "https://twitter.com/surj_nova",
          instagram: "https://www.instagram.com/surjnova/",
          facebook: "https://www.facebook.com/SURJNoVa/",
          website: "https://www.surjnova.org/"
        },
        {
          orgName: "Black Lives Matter DC",
          imageLink: "/images/coalition/Sanctiuary_DMV.png",
          imageAlt: "Sanctuary logo",
          imageAltSpanish: "Spanish Sancturary",
          english:
            "Sanctuary DMV is a feminist, anti-imperialist, all-volunteer group standing in solidarity with immigrants and marginalized communities in the DMV area. We resist policies and policy proposals that target and aim to deport millions of undocumented immigrants and discriminate against Black, Indigenous, Muslim, Latinx, and LGBTQ+ people.",
          spanish:
            "Sanctuary DMV es un grupo feminista y anti-imperialista completamente compuesta de voluntarixs que se mantie en solidaridad con inmigrantes y comunidades.",
          twitter: "https://twitter.com/SanctuaryDMV",
          instagram: "https://www.instagram.com/sanctuarydmv/",
          facebook: "https://www.facebook.com/SanctuaryDMV",
          website: "http://sanctuarydmv.org/"
        },
        {
          orgName: "Sunrise Movement",
          imageLink: "/images/coalition/Sunrise.jpg",
          imageAlt: "Sunrise logo",
          imageAltSpanish: "Spanish Sunrise",
          english:
            "The Sunrise Movement is a youth movement to stop climate change and create millions of good jobs in the process. Sunrise has expanded to other youth powered actions, such as social justice reform.",
          spanish:
            "El Movimiento Sunrise es un movimiento juvenil para detener el cambio climático y crear millones de buenos empleos en el proceso. Sunrise se ha expandido a otras acciones impulsadas por jóvenes, como la reforma de la justicia social.",
          twitter: "https://twitter.com/sunrisevirginia",
          instagram: "https://www.instagram.com/sunrise_arlingtonva/",
          facebook: "https://www.facebook.com/SunriseArlingtonVA",
          website: "https://www.sunrisemovement.org/"
        },
        {
          orgName: "Until We Are All Free",
          imageLink: "/images/coalition/UWAAF.png",
          imageAlt: "UWAAF logo",
          imageAltSpanish: "Spanish UWAAF",
          english:
            "Until We Are All Free is a human rights organization led by formerly incarcerated criminal justice experts. We focus on building capital, resources and support to provide pathways to civic and economic liberation for individuals disenfranchised by mass incarceration.",
          spanish:
            "Hasta Que Todos Seamos Libres es una organización de derechos humanos dirigida por expertos en justicia penal que anteriormente fueron encarcelados. Nos enfocamos en generar capital, recursos y apoyo para proporcionar vías hacia la liberación cívica y económica para las personas privadas de sus derechos por el encarcelamiento masivo.",
          twitter: "https://twitter.com/untilweallfree",
          instagram: "https://www.instagram.com/untilweareallfr33/",
          facebook: "https://www.facebook.com/UntilAllFree/",
          website: "https://uwaaf.org/"
        },
        {
          orgName: "SONG",
          imageLink: "/images/coalition/Song.png",
          imageAlt: "SONG logo",
          imageAltSpanish: "Spanish Song",
          english:
            "SONG is a home for LGBTQ liberation across all lines of race, class, abilities, age, culture, gender, and sexuality in the South. We build, sustain, and connect a southern regional base of LGBTQ people in order to transform the region through strategic projects and campaigns developed in response to the current conditions in our communities.",
          spanish:
            "SONG es un hogar para la liberación LGBTQ que cruza demarcaciones de raza, clase, habilidades, edad, cultura, género y sexualidad en el Sur. Construimos, sostenemos y conectamos una base regional sureña de personas LGBTQ para transformar la región a través de proyectos estratégicos y campañas desarrolladas en respuesta a las condiciones actuales de nuestras comunidades.",
          twitter: "https://twitter.com/ignitekindred?lang=en",
          instagram: "https://www.instagram.com/ignitekindred/?hl=en",
          facebook: "https://www.facebook.com/ignitekindred/",
          website: "https://southernersonnewground.org/"
        },
        {
          orgName: "The National Immigration Project",
          imageLink: "/images/coalition/NIP.jpg",
          imageAlt: "NIP logo",
          imageAltSpanish: "Spanish NIP",
          english:
            "The National Immigration Project provides legal/technical support to immigration attorneys, community activists, advocates, and immigrant communities, while promoting justice in the criminal system, and at the intersection of criminal and immigration law.",
          spanish:
            "El Proyecto Nacional de Inmigración brinda apoyo legal/técnico a abogados de inmigración, activistas comunitarios, defensores y comunidades de inmigrantes, mientras promueve la justicia en el sistema penal y en la intersección de las leyes penales y de inmigración.",
          twitter: "https://twitter.com/NIPNLG",
          facebook: "https://www.facebook.com/NIPNLG",
          website: "https://www.nationalimmigrationproject.org/"
        },
        {
          orgName: "The Mayan League",
          imageLink: "/images/coalition/Mayan_League.jpg",
          imageAlt: "Mayan League logo",
          imageAltSpanish: "Spanish MAyan",
          english:
            "The Mayan League is a Maya organization whose purpose is to promote, preserve, and transmit the cosmovision and worldview, culture, history, and contributions of our ancestors and the values of our traditional knowledge and stewardship of the earth into solutions and actions against current threats and violations affecting our peoples, the earth, and humanity.",
          spanish:
            "La Liga Maya es una organización maya cuyo propósito es promover, preservar y transmitir la cosmovisión, cultura, historia y aportes de nuestros antepasados y los valores de nuestro conocimiento tradicional y la custodia de la tierra en soluciones y acciones frente a las amenazas y violaciones actuales que afectan a nuestros pueblos, a la tierra ya la humanidad.",
          twitter: "https://twitter.com/MayanLeague",
          instagram: "https://www.instagram.com/",
          facebook: "https://www.facebook.com/mayanleague/",
          website: "https://www.mayanleague.org/"
        },
        {
          orgName: "CASA In Virginia",
          imageLink: "/images/coalition/Casa_In_Virginia.png",
          imageAlt: "Casa In Virginia logo",
          imageAltSpanish: "Spanish Casa",
          english:
            "With over 122,000 lifetime Latino, immigrant, and working-class members across 46 US states, CASA is the foremost immigrant organization in the mid-Atlantic region and a national leader in supporting immigrant families and ensuring that all individuals have the core supports necessary for full participation in society.",
          spanish:
            "Con más de 122,000 miembros latinos, inmigrantes y de clase trabajadora de por vida en 46 estados de EE.UU., CASA es la principal organización de inmigrantes en la región media del Atlántico y un líder nacional en el apoyo a las familias inmigrantes y en garantizar que todas las personas tengan los apoyos básicos necesarios para una vida plena.",
          twitter: "https://twitter.com/CASAforall",
          instagram: "https://www.instagram.com/casa4all/",
          facebook: "https://www.facebook.com/CASAenVirginia/",
          website: "https://wearecasa.org/"
        },
        {
          orgName: "Congregation Action Network",
          imageLink: "/images/coalition/Congresgation_Action_Network.png",
          imageAlt: "Congregation Action Network logo",
          imageAltSpanish: "Spanish CAN",
          english:
            "The Congregation Action Network is a network of faith communities in Washington, DC, and the Maryland and Virginia suburbs acting in solidarity to end detention, deportation, profiling, and criminalization of immigrants and demanding and upholding justice, dignity, safety, and family unity.",
          spanish:
            "La Red de Acción de la Congregación es una red de comunidades religiosas en Washington, DC y los suburbios de Maryland y Virginia que actúan en solidaridad para poner fin a la detención, deportación, criminalización de inmigrantes y exigen y defienden la justicia, la dignidad, la seguridad y la unidad familiar.",
          twitter: "https://twitter.com/congactionnet",
          facebook: "https://www.facebook.com/CongActionNet",
          website: "https://www.congregationactionnetwork.org/"
        },
        {
          orgName: "NAKASEC Virginia",
          imageLink: "/images/coalition/NAKASEC_Virginia.jpg",
          imageAlt: "NAKASEC Virginia logo",
          imageAltSpanish: "Spanish NAKASEC",
          english:
            "NAKASEC VA develops holistic programs and campaigns that are guided by community members, meets immediate needs while building Asian American community power to make long-term systemic changes that address the root causes of these needs, and centers human connections.",
          spanish:
            "NAKASEC VA desarrolla programas y campañas holísticos que son guiados por miembros de la comunidad, satisface las necesidades inmediatas mientras construye el poder de la comunidad asiático-estadounidense para realizar cambios sistémicos a largo plazo que abordan las causas fundamentales de estas necesidades y centra las conexiones humanas.",
          twitter: "https://twitter.com/nakasec",
          instagram: "https://www.instagram.com/nakasec/",
          facebook: "https://www.facebook.com/nakasec",
          website: "https://nakasec.org/va2"
        },
        {
          orgName: "Our Revolution Arlington",
          imageLink: "/images/coalition/Our_Revoulution_Arlington.png",
          imageAlt: "Our Revolution Arlington logo",
          imageAltSpanish: "Spanish Our Rev Alrington",
          english:
            "Our Revolution Arlington (ORA) seeks to galvanize and organize Arlington and Virginia residents of all walks of life to fight for a bold progressive agenda that will transform our community and state into a more democratic, just, and sustainable place.",
          spanish:
            "Our Revolution Arlington (ORA) busca impulsar y organizar a los residentes de Arlington y Virginia de todos los ámbitos de la vida para luchar por una audaz agenda progresista que transformará nuestra comunidad y estado en un lugar más democrático, justo y sostenible.",
          twitter: "https://twitter.com/ORArlington",
          facebook: "https://www.facebook.com/ORArlington",
          website: "https://orarlington.wordpress.com/"
        },
        {
          orgName: "Mijente",
          imageLink: "/images/coalition/Mijente.jpg",
          imageAlt: "Mijente logo",
          imageAltSpanish: "Spanish Mijente",
          english:
            "THE J IS FOR JUSTICE. We are a political home for Latinx and Chicanx people who seek racial, economic, gender and climate justice. Often we are told as Latinxs that in order to get ahead we need to just work hard and not ask questions. We believe the opposite - we need to hold our heads high and speak out. Mijente helps people do this through campaigns, connects people across a wide network and serves as a hub for culture, learning and advocacy.",
          spanish:
            "LA J ES DE JUSTICIA. Somos un hogar político para personas latinx y chicanx que buscan justicia racial, económica, de género y climática. A menudo, como latinxs, se nos dice que para salir adelante debemos trabajar duro y no hacer preguntas. Creemos lo contrario: debemos mantener la cabeza en alto y hablar. Mijente ayuda a las personas a hacer esto a través de campañas, conecta a las personas a través de una amplia red y sirve como un centro para la cultura, el aprendizaje y la promoción.",
          twitter: "https://twitter.com/ConMijente",
          instagram: "https://www.instagram.com/conmijente/",
          facebook: "https://www.facebook.com/conmijente",
          website: "https://mijente.net/"
        },
        {
          orgName: "For Us, Not Amazon",
          imageLink: "/images/coalition/For_Us_Not_Amazon.jpg",
          imageAlt: "For Us Not Amazon logo",
          imageAltSpanish: "Spanish For US not Amazon",
          english:
            "For Us, Not Amazon is a coalition in Northern Virginia for working people, immigrants, and people of color against an Amazon takeover in Arlington and VA.",
          spanish:
            "For Us, Not Amazon es una coalición en el norte de Virginia para trabajadores, inmigrantes y personas de color contra la adquisición de Arlington y VA por Amazon.",
          twitter: "https://twitter.com/forusnotamazon",
          instagram: "https://www.instagram.com/forusnotamazon/",
          facebook: "https://www.facebook.com/ForUsNotAmazon/"
        }
      ],
      skipDuplicates: true
    });

    console.log("SEEDED DATA SUCCESSFULLY");
  } catch (e) {
    console.log("ERROR WHILE SEEDING DATA", e);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
