import {
  AuthorProfile,
  Collection,
  CuratedWork,
  Entry,
  ProfessionalItem,
  Study,
  Thread,
} from '../types';

export const INITIAL_THREADS: Thread[] = [
  {
    id: 't-memory',
    slug: 'memory',
    name: 'Memory',
    description: 'Traces of temporal decay, archival recall, and personal recollection across mediums.',
  },
  {
    id: 't-heritage',
    slug: 'heritage',
    name: 'Heritage',
    description: 'Ancestral lineages, diaspora histories, and cultural survivals in urban enclaves.',
  },
  {
    id: 't-governance',
    slug: 'governance',
    name: 'Governance',
    description: 'Institutional structures, archival classification rules, and protocols of recording.',
  },
  {
    id: 't-art-history',
    slug: 'art-history',
    name: 'Art History',
    description: 'Historical precedents, materiality of pigment and stone, and classical genealogies.',
  },
  {
    id: 't-archive',
    slug: 'archive',
    name: 'Archive',
    description: 'Taxonomies, index cards, metadata systems, and the preservation of fragile ephemera.',
  },
  {
    id: 't-info-arch',
    slug: 'information-architecture',
    name: 'Information Architecture',
    description: 'Structural systems, schema design, structural classification, and navigational models.',
  },
  {
    id: 't-identity',
    slug: 'identity',
    name: 'Identity',
    description: 'The construction of the self through nomenclature, script, and translingual spaces.',
  },
  {
    id: 't-urbanism',
    slug: 'urbanism',
    name: 'Urbanism',
    description: 'Spatial density, street typography, architectural palimpsests, and pedestrian field logs.',
  },
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-arch-arch',
    slug: 'archive-architecture',
    title: 'Archive Architecture',
    code: 'COL-01',
    description:
      'Investigations into taxonomic schemas, metadata labeling, and structural classification protocols for digital and physical repositories.',
    dateRange: '2025 — Present',
    studyIds: ['std-meta-labels', 'std-rev-systems', 'std-mem-struct'],
    order: 1,
    location: 'Los Angeles / Online',
  },
  {
    id: 'col-eur-fields',
    slug: 'european-field-studies',
    title: 'European Field Studies',
    code: 'COL-02',
    description:
      'Field observations, photographic surveys, and epigraphic records from Mediterranean port cities and historical archival depositories.',
    dateRange: '2024 — 2026',
    studyIds: ['std-stone-ephemera', 'std-venice-grid'],
    order: 2,
    location: 'Venice / Marseille / Rome',
  },
  {
    id: 'col-chinatown',
    slug: 'chinatown-studies',
    title: 'Chinatown Studies',
    code: 'COL-03',
    description:
      'Linguistic, typographic, and architectural documentation of diasporic vernacular signage, clan associations, and spatial enclaves.',
    dateRange: '2023 — Present',
    studyIds: ['std-vernacular-type', 'std-dialect-phonology'],
    order: 3,
    location: 'San Francisco / Los Angeles / New York',
  },
  {
    id: 'col-temp-topo',
    slug: 'temporal-topographies',
    title: 'Temporal Topographies',
    code: 'COL-04',
    description:
      'Studies of ambient light, spatial thresholds, and transitional domestic spaces in East and Southeast Asian architectures.',
    dateRange: '2024 — 2026',
    studyIds: ['std-shophouse-shadows'],
    order: 4,
    location: 'Taipei / Kyoto / Penang',
  },
];

export const INITIAL_STUDIES: Study[] = [
  {
    id: 'std-meta-labels',
    slug: 'metadata-labels',
    collectionId: 'col-arch-arch',
    title: 'Metadata Labels & Taxonomies',
    code: 'STD-01',
    description:
      'The semantic constraints and physical affordances of indexing labels, catalog numbers, and archival naming conventions.',
    entryIds: ['entry-001', 'entry-004', 'entry-010'],
    threadIds: ['t-info-arch', 't-archive', 't-governance'],
    relatedStudyIds: ['std-rev-systems', 'std-mem-struct'],
    order: 1,
    status: 'Active',
  },
  {
    id: 'std-rev-systems',
    slug: 'revision-systems',
    collectionId: 'col-arch-arch',
    title: 'Revision Systems & State Changes',
    code: 'STD-02',
    description:
      'Theoretical inquiry into versioning, intentional artist revisions (REV 00 to REV N), and divergent document states.',
    entryIds: ['entry-002', 'entry-008'],
    threadIds: ['t-archive', 't-info-arch', 't-memory'],
    relatedStudyIds: ['std-meta-labels', 'std-stone-ephemera'],
    order: 2,
    status: 'Active',
  },
  {
    id: 'std-stone-ephemera',
    slug: 'epigraphs-and-stone',
    collectionId: 'col-eur-fields',
    title: 'Epigraphs, Stone & Inscribed Memory',
    code: 'STD-03',
    description:
      'Photographic and physical recording of eroded Roman lapidary inscriptions, marble markers, and weather-worn palimpsests.',
    entryIds: ['entry-003', 'entry-007', 'entry-012'],
    threadIds: ['t-art-history', 't-memory', 't-archive'],
    relatedStudyIds: ['std-vernacular-type', 'std-venice-grid'],
    order: 3,
    status: 'Ongoing',
  },
  {
    id: 'std-venice-grid',
    slug: 'spatial-grids-of-venice',
    collectionId: 'col-eur-fields',
    title: 'Spatial Grids & Water Thresholds',
    code: 'STD-04',
    description:
      'Mapping pedestrian blind alleys, water steps, and structural stone buttresses across the Cannaregio and Castello sestieri.',
    entryIds: ['entry-005', 'entry-011'],
    threadIds: ['t-urbanism', 't-art-history'],
    relatedStudyIds: ['std-stone-ephemera', 'std-shophouse-shadows'],
    order: 4,
    status: 'Archived',
  },
  {
    id: 'std-vernacular-type',
    slug: 'vernacular-typography',
    collectionId: 'col-chinatown',
    title: 'Vernacular Typography & Neon Signage',
    code: 'STD-05',
    description:
      'Typographic documentation of hand-lettered gold leaf on glass, bilingual neon armatures, and hand-painted commercial characters.',
    entryIds: ['entry-006', 'entry-009', 'entry-014'],
    threadIds: ['t-heritage', 't-identity', 't-urbanism', 't-art-history'],
    relatedStudyIds: ['std-dialect-phonology', 'std-stone-ephemera'],
    order: 5,
    status: 'Active',
  },
  {
    id: 'std-dialect-phonology',
    slug: 'dialect-phonology-archives',
    collectionId: 'col-chinatown',
    title: 'Phonology & Translingual Cartographies',
    code: 'STD-06',
    description:
      'Sound fragments, romanization variations (Taishanese, Cantonese, Hakka), and lexical shift records in migrant community centers.',
    entryIds: ['entry-013'],
    threadIds: ['t-heritage', 't-memory', 't-identity'],
    relatedStudyIds: ['std-vernacular-type'],
    order: 6,
    status: 'Active',
  },
  {
    id: 'std-shophouse-shadows',
    slug: 'shadows-in-the-shophouse',
    collectionId: 'col-temp-topo',
    title: 'Shadows & Domestic Apertures',
    code: 'STD-07',
    description:
      'Photometric observation of deep courtyards, wooden louvered shutters, and the passage of tropical afternoon rain.',
    entryIds: ['entry-015'],
    threadIds: ['t-urbanism', 't-memory', 't-art-history'],
    relatedStudyIds: ['std-venice-grid'],
    order: 7,
    status: 'Active',
  },
  {
    id: 'std-mem-struct',
    slug: 'memory-structures',
    collectionId: 'col-arch-arch',
    title: 'Memory Structures & Digital Scriptorium',
    code: 'STD-08',
    description:
      'Synthesizing medieval monastic filing models with modern vector search algorithms and non-linear indexing schemes.',
    entryIds: [],
    threadIds: ['t-info-arch', 't-archive', 't-memory'],
    relatedStudyIds: ['std-meta-labels', 'std-rev-systems'],
    order: 8,
    status: 'Ongoing',
  },
];

export const INITIAL_ENTRIES: Entry[] = [
  {
    id: 'entry-015',
    slug: 'entry-015-aperture-geometry-penang',
    entryNumber: '015',
    title: 'Aperture Geometry in George Town Shophouses',
    collectionId: 'col-temp-topo',
    studyId: 'std-shophouse-shadows',
    revision: 'REV 01',
    createdDate: '2026.08.12',
    publishedDate: '2026.08.13',
    location: 'George Town, Penang',
    threadIds: ['t-urbanism', 't-memory', 't-art-history'],
    relatedStudyIds: ['std-venice-grid', 'std-stone-ephemera'],
    visibility: 'published',
    summary: 'Observations on light wells, courtyard drafts, and the damp boundary between interior chamber and street.',
    contentBlocks: [
      {
        id: 'b-15-1',
        type: 'text',
        content:
          'The air well (chim-che) acts not merely as a structural conduit for ventilation, but as an optical diaphragm. In the morning light, dust suspended in the high humidity renders the shaft of illumination solid, slicing through the dark teak beams of the upper gallery.',
      },
      {
        id: 'b-15-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
        caption: 'Specimen 015-A: Incident angle through central light well, 11:42 AM. Damp lime plaster wall.',
        alt: 'Geometric beam of light entering traditional architectural interior',
      },
      {
        id: 'b-15-3',
        type: 'fragment',
        fragments: [
          {
            id: 'f-15-1',
            timestamp: '14:20',
            note: 'Temperature differential between street facade and inner courtyard measured at ~3.4°C.',
            tag: 'Field Note',
          },
          {
            id: 'f-15-2',
            timestamp: '16:05',
            note: 'Monsoon deluge begins; granite courtyard floor channels runoff through open stone trough.',
            tag: 'Acoustics',
          },
        ],
      },
    ],
  },
  {
    id: 'entry-014',
    slug: 'entry-014-bilingual-glass-gilding-wexford',
    entryNumber: '014',
    title: 'Bilingual Glass Gilding and Gold Leaf Decalcomania',
    collectionId: 'col-chinatown',
    studyId: 'std-vernacular-type',
    revision: 'REV 00',
    createdDate: '2026.08.03',
    publishedDate: '2026.08.04',
    location: 'San Francisco',
    threadIds: ['t-heritage', 't-identity', 't-art-history', 't-urbanism'],
    relatedStudyIds: ['std-vernacular-type', 'std-dialect-phonology'],
    visibility: 'published',
    summary: 'Reverse-glass gold leaf techniques utilized in 1940s benevolent association transoms.',
    contentBlocks: [
      {
        id: 'b-14-1',
        type: 'text',
        content:
          'Examination of the transom glass at Waverly Place reveals triple-layered water gilding using 23-karat Russian leaf with mother-of-pearl inlay. The Chinese characters (華埠互助社) are brushed in a robust Kai-shu script with terminal terminals characteristic of Guangdong master carvers from the late Republican era.',
      },
      {
        id: 'b-14-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
        caption: 'Specimen 014-B: Glass reverse-gilding wear along the western exterior sash. Wave distortion visible.',
        alt: 'Historic typography on glass window pane',
      },
      {
        id: 'b-14-3',
        type: 'reference',
        source: 'Lee, Philip C. (1958). Signs and Inscriptions of the San Francisco Chinese Quarter. Chronicle Press, p. 84.',
      },
    ],
  },
  {
    id: 'entry-013',
    slug: 'entry-013-phonetic-shifts-taishanese-vowels',
    entryNumber: '013',
    title: 'Phonetic Shifts in Taishanese Vowel Tones (1960–2020)',
    collectionId: 'col-chinatown',
    studyId: 'std-dialect-phonology',
    revision: 'REV 00',
    createdDate: '2026.07.29',
    publishedDate: '2026.07.30',
    location: 'Los Angeles / Chinatown',
    threadIds: ['t-heritage', 't-memory', 't-identity'],
    relatedStudyIds: ['std-vernacular-type'],
    visibility: 'published',
    summary: 'Transcripts and spectral analysis of recorded family audio reels and oral accounts.',
    contentBlocks: [
      {
        id: 'b-13-1',
        type: 'text',
        content:
          'The gradual flattening of the high-falling tone (Tone 1) in the speech of second-generation diaspora speakers indicates a systemic assimilation toward standard Cantonese pitch registers. Recordings made at the Kong Chow Temple between 1974 and 1982 preserve the archaic voiced velar stop [ɡ] before front vowels.',
      },
      {
        id: 'b-13-2',
        type: 'fragment',
        fragments: [
          {
            id: 'f-13-1',
            timestamp: '00:14:32',
            note: 'Elder tape reel #3: Pronunciation of 廣州 (Guangzhou) with initial [kɔŋ] vs modern [kwɔŋ].',
            tag: 'Phonology',
          },
          {
            id: 'f-13-2',
            timestamp: '00:28:10',
            note: 'Loss of intermediate glottal stop in rapid enumerations of rice cultivars.',
            tag: 'Lexicon',
          },
        ],
      },
    ],
  },
  {
    id: 'entry-012',
    slug: 'entry-012-marseille-dockland-quarry-marks',
    entryNumber: '012',
    title: 'Quarry Cutter Marks on the Quai des Belges Masonry',
    collectionId: 'col-eur-fields',
    studyId: 'std-stone-ephemera',
    revision: 'REV 02',
    createdDate: '2026.07.21',
    publishedDate: '2026.07.22',
    location: 'Marseille',
    threadIds: ['t-art-history', 't-archive', 't-memory'],
    relatedStudyIds: ['std-stone-ephemera', 'std-venice-grid'],
    visibility: 'published',
    summary: 'Chiseled mason signatures dating from the 1845 harbor extension project in Cassis limestone.',
    contentBlocks: [
      {
        id: 'b-12-1',
        type: 'text',
        content:
          'Cassis limestone carries a high density of rudist fossil shells, providing a distinctive crystalline backdrop against which the hand-cut mason marks stand out in relief. We recorded seventeen distinct geometric marks—chiefly eight-pointed stars, cross-hatchings, and hooked crescents.',
      },
      {
        id: 'b-12-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        caption: 'Fig 12.4: Masonry incision along Pier 3, saltwater line. Cassis fossiliferous limestone.',
        alt: 'Chiseled stonework on historic dock',
      },
      {
        id: 'b-12-3',
        type: 'quote',
        content: '“A quarry mark is not an artistic declaration; it is an accounting ledger cut into the body of the mountain.”',
        source: 'Field Notebook 04, Marseille harbor log',
      },
    ],
  },
  {
    id: 'entry-011',
    slug: 'entry-011-venice-cannaregio-buttress-shadows',
    entryNumber: '011',
    title: 'Tension Rods and Buttress Shadows along Rio di Sant’Alvise',
    collectionId: 'col-eur-fields',
    studyId: 'std-venice-grid',
    revision: 'REV 00',
    createdDate: '2026.07.16',
    publishedDate: '2026.07.17',
    location: 'Venice',
    threadIds: ['t-urbanism', 't-art-history'],
    relatedStudyIds: ['std-stone-ephemera', 'std-shophouse-shadows'],
    visibility: 'published',
    summary: 'Structural wrought-iron catene (tie rods) traversing narrow residential canal facades.',
    contentBlocks: [
      {
        id: 'b-11-1',
        type: 'text',
        content:
          'Venetian catene (wrought-iron anchor plates on canal facades) are visual indicators of structural displacement. They mark where the brick masonry arches have leaned toward the canal bed over four centuries. In low morning tide, their reflections form complete closed loops with the murky waterline.',
      },
      {
        id: 'b-11-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=1200&auto=format&fit=crop',
        caption: 'Observation 11.2: Iron anchor plate, S-curve bracket, Rio di Sant’Alvise.',
        alt: 'Venetian brick canal and water reflection',
      },
    ],
  },
  {
    id: 'entry-010',
    slug: 'entry-010-index-card-ruling-density',
    entryNumber: '010',
    title: 'Ruling Density and Column Spacing in 19th-Century Card Catalogs',
    collectionId: 'col-arch-arch',
    studyId: 'std-meta-labels',
    revision: 'REV 01',
    createdDate: '2026.07.12',
    publishedDate: '2026.07.13',
    location: 'Los Angeles',
    threadIds: ['t-info-arch', 't-archive', 't-governance'],
    relatedStudyIds: ['std-meta-labels', 'std-rev-systems'],
    visibility: 'published',
    summary: 'The transition from handwritten library slips to standardized 75x125mm Bureau cards.',
    contentBlocks: [
      {
        id: 'b-10-1',
        type: 'text',
        content:
          'The 75 × 125 mm index card was not merely a physical dimension; it was a temporal discipline. The constraint forced catalogers to compress bibliographic reality into exactly four hierarchical lines: Author, Title, Imprint, and Call Number. Everything that resisted this four-line compression was silently discarded from institutional memory.',
      },
      {
        id: 'b-10-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop',
        caption: 'Specimen 010: Standardized card catalog drawer drawer with brass label frame.',
        alt: 'Vintage library card catalog drawer',
      },
    ],
  },
  {
    id: 'entry-009',
    slug: 'entry-009-neon-electrode-decay-broadway',
    entryNumber: '009',
    title: 'Electrode Decay and Gas Color Drift in Broadway Signage',
    collectionId: 'col-chinatown',
    studyId: 'std-vernacular-type',
    revision: 'REV 00',
    createdDate: '2026.07.09',
    publishedDate: '2026.07.10',
    location: 'Los Angeles / DTLA',
    threadIds: ['t-urbanism', 't-art-history', 't-heritage'],
    relatedStudyIds: ['std-vernacular-type'],
    visibility: 'published',
    summary: 'Measuring phosphor depletion in vintage argon-mercury glass tubing on historic movie palaces.',
    contentBlocks: [
      {
        id: 'b-9-1',
        type: 'text',
        content:
          'As mercury vapor settles along the lower bends of glass tubing, the luminous discharge shifts from crisp daylight white to a dim violet hue. This color shift provides an unintended chronological clock: the colder the tone, the older the continuous operational run.',
      },
      {
        id: 'b-9-2',
        type: 'fragment',
        fragments: [
          {
            id: 'f-9-1',
            timestamp: '21:15',
            note: 'Sign #4: Sputtering electrode at the tail of the letter "R". High frequency hum at 60Hz.',
            tag: 'Acoustics',
          },
          {
            id: 'f-9-2',
            timestamp: '22:40',
            note: 'Ambient humidity 78%; transformer insulation failure causing intermittent flash cycles.',
            tag: 'Electrical',
          },
        ],
      },
    ],
  },
  {
    id: 'entry-008',
    slug: 'entry-008-semantic-versioning-vs-revision-intent',
    entryNumber: '008',
    title: 'Semantic Versioning vs. The Intentional Artistic Revision',
    collectionId: 'col-arch-arch',
    studyId: 'std-rev-systems',
    revision: 'REV 03',
    createdDate: '2026.07.08',
    publishedDate: '2026.07.09',
    location: 'Los Angeles',
    threadIds: ['t-archive', 't-info-arch', 't-governance'],
    relatedStudyIds: ['std-meta-labels', 'std-rev-systems'],
    visibility: 'published',
    summary: 'Why software SemVer fails to represent aesthetic refinement and deliberate philosophical regressions.',
    contentBlocks: [
      {
        id: 'b-8-1',
        type: 'text',
        content:
          'Software versioning assumes monotonic forward progress: bugs are fixed, features are added, breaking changes increment the major integer. But in artistic and architectural thought, an edit is often a purposeful deletion—a peeling back of structural excess to reveal an earlier, quieter state. For RUI, REV 01 is not "better" than REV 00; it is an alternative coordinate in thought.',
      },
      {
        id: 'b-8-2',
        type: 'two-column',
        leftColumn:
          '**Software SemVer (v1.2.4)**\n- Linear, accumulative\n- Automated pipeline trigger\n- Prioritizes backward compatibility\n- Erases draft history upon merge',
        rightColumn:
          '**RUI Revision (REV 00 / 01)**\n- Non-linear, deliberative\n- Human-controlled threshold\n- Preserves divergence as evidence\n- Treats each revision as a standalone artifact',
      },
    ],
  },
  {
    id: 'entry-007',
    slug: 'entry-007-roman-forum-travertine-weathering',
    entryNumber: '007',
    title: 'Travertine Erosion Patterns on the Arch of Septimius Severus',
    collectionId: 'col-eur-fields',
    studyId: 'std-stone-ephemera',
    revision: 'REV 00',
    createdDate: '2026.07.08',
    publishedDate: '2026.07.08',
    location: 'Rome',
    threadIds: ['t-art-history', 't-archive', 't-memory'],
    relatedStudyIds: ['std-stone-ephemera'],
    visibility: 'published',
    summary: 'Laser scan documentation of sulfur particulate deposits and rainwater runoff channels.',
    contentBlocks: [
      {
        id: 'b-7-1',
        type: 'text',
        content:
          'The south cornice of the Severan arch exhibits differential dissolution: the Proconnesian marble reliefs have lost their sharp tooling marks, while the underlying travertine ashlar blocks retain the deep groove cuts of the original Roman iron crowbars.',
      },
      {
        id: 'b-7-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop',
        caption: 'Field specimen 007-R: Weathered marble frieze with rainwater gypsum crust.',
        alt: 'Ancient Roman marble ruins with weathering',
      },
    ],
  },
  {
    id: 'entry-006',
    slug: 'entry-006-gold-mountain-guild-hall-transoms',
    entryNumber: '006',
    title: 'Typographic Forms of the Gold Mountain Benevolent Associations',
    collectionId: 'col-chinatown',
    studyId: 'std-vernacular-type',
    revision: 'REV 01',
    createdDate: '2026.07.07',
    publishedDate: '2026.07.08',
    location: 'San Francisco',
    threadIds: ['t-heritage', 't-identity', 't-art-history'],
    relatedStudyIds: ['std-vernacular-type', 'std-dialect-phonology'],
    visibility: 'published',
    summary: 'A study of hand-carved camphorwood plaques in the six historic district associations.',
    contentBlocks: [
      {
        id: 'b-6-1',
        type: 'text',
        content:
          'The carved plaques hanging above the altar tables of the Sam Yup Association (三邑會館) present a distinctive Southern calligraphy style known as ‘Iron Wire’ clerical script. Unlike the flamboyant cursive scrolls favored in scholarly circles, these institutional characters emphasize horizontal stability and unwavering symmetry.',
      },
      {
        id: 'b-6-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop',
        caption: 'Specimen 006-A: Carved camphorwood sign board with cinnabar and gold pigment.',
        alt: 'Historic carved woodwork with gold calligraphy',
      },
      {
        id: 'b-6-3',
        type: 'reference',
        source: 'Hom, Marlon K. (1987). Songs of Gold Mountain: Cantonese Rhymes from San Francisco Chinatown. University of California Press.',
      },
    ],
  },
  {
    id: 'entry-005',
    slug: 'entry-005-venice-water-steps-istrian-stone',
    entryNumber: '005',
    title: 'Istrian Stone Water Steps and Algal Stratification',
    collectionId: 'col-eur-fields',
    studyId: 'std-venice-grid',
    revision: 'REV 00',
    createdDate: '2026.07.07',
    publishedDate: '2026.07.07',
    location: 'Venice',
    threadIds: ['t-urbanism', 't-art-history', 't-memory'],
    relatedStudyIds: ['std-stone-ephemera', 'std-venice-grid'],
    visibility: 'published',
    summary: 'The low-tide threshold of submerged marble blocks at Fondamenta dei Ormesini.',
    contentBlocks: [
      {
        id: 'b-5-1',
        type: 'text',
        content:
          'Istrian stone (pietra d’Istria) is virtually impermeable to saltwater penetration, unlike the soft brick masonry it protects. However, at the diurnal tide level, green Ulva intestinalis algae creates a dark slick band exactly 18 centimeters above the mean water line, marking the true kinetic pulse of the lagoon.',
      },
      {
        id: 'b-5-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1523906834658-6e2b32c840bf?q=80&w=1200&auto=format&fit=crop',
        caption: 'Observation 005: Water gate threshold at Fondamenta dei Ormesini during 10:00 AM ebb.',
        alt: 'Venice canal stone step with calm water reflection',
      },
    ],
  },
  {
    id: 'entry-004',
    slug: 'entry-004-metadata-labels-and-classification',
    entryNumber: '004',
    title: 'Metadata Labels and The Typographic Archive',
    collectionId: 'col-arch-arch',
    studyId: 'std-meta-labels',
    revision: 'REV 00',
    createdDate: '2026.07.07',
    publishedDate: '2026.07.07',
    location: 'Los Angeles',
    threadIds: ['t-info-arch', 't-archive', 't-memory'],
    relatedStudyIds: ['std-rev-systems', 'std-mem-struct'],
    visibility: 'published',
    summary: 'Several paragraphs of sample notebook text exploring the ontology of metadata labels and fixed structural wrappers.',
    contentBlocks: [
      {
        id: 'b-4-1',
        type: 'text',
        content:
          'When we place a metadata label onto an artifact, we are performing an act of intellectual boundary-making. The label claims to summarize what is inside, yet it inevitably establishes a rigid frame that excludes peripheral phenomena. In digital systems, this exclusion is catastrophic: an un-indexed dimension simply does not exist for the query engine.',
      },
      {
        id: 'b-4-2',
        type: 'text',
        content:
          'By decoupling the rigid metadata framework (Collection, Study, Entry, Revision, Location, Threads) from the internal notebook contents, we construct an archive that remains machine-traversable without flattening the messy, multi-modal idiosyncrasies of human thought.',
      },
      {
        id: 'b-4-3',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
        caption: 'Fig 4.1: Archival index slip alongside linen-bound research ledger.',
        alt: 'Archival binder and notebook with vintage index notes',
      },
      {
        id: 'b-4-4',
        type: 'fragment',
        fragments: [
          {
            id: 'f-4-1',
            timestamp: '09:30',
            note: '“The label is not the territory, but it determines which paths are cleared through the forest.”',
            tag: 'Ontology',
          },
          {
            id: 'f-4-2',
            timestamp: '11:15',
            note: 'Re-evaluated schema: collections must remain strictly contextual, while threads span transversally.',
            tag: 'Architecture',
          },
        ],
      },
      {
        id: 'b-4-5',
        type: 'reference',
        source: 'Bowker, Geoffrey C., and Susan Leigh Star. (1999). Sorting Things Out: Classification and Its Consequences. MIT Press.',
      },
    ],
  },
  {
    id: 'entry-003',
    slug: 'entry-003-rubbing-techniques-marble-friezes',
    entryNumber: '003',
    title: 'Ink Rubbing (拓片) Protocols on Weathered Marble',
    collectionId: 'col-eur-fields',
    studyId: 'std-stone-ephemera',
    revision: 'REV 01',
    createdDate: '2026.07.06',
    publishedDate: '2026.07.06',
    location: 'Rome / Ostia Antica',
    threadIds: ['t-art-history', 't-archive', 't-memory'],
    relatedStudyIds: ['std-stone-ephemera', 'std-vernacular-type'],
    visibility: 'published',
    summary: 'Adapting ancient Song Dynasty ink rubbing techniques to Roman travertine funerary monuments.',
    contentBlocks: [
      {
        id: 'b-3-1',
        type: 'text',
        content:
          'Traditional Chinese ink rubbing (tàpiàn, 拓片) relies on mulberry paper dampened with bletilla striata mucilage, beaten softly into the stone incisions using palm-fiber brushes. Applying this protocol to Roman inscriptions reveals micro-fissures and chisel directionalities entirely invisible to high-resolution photogrammetry.',
      },
      {
        id: 'b-3-2',
        type: 'image',
        imageUrl:
          'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop',
        caption: 'Specimen 003-B: Mulberry paper rubbing lifted from Ostia Antica merchant epitaph.',
        alt: 'Detailed black and white ink rubbing texture',
      },
    ],
  },
  {
    id: 'entry-002',
    slug: 'entry-002-branching-lineages-of-the-draft',
    entryNumber: '002',
    title: 'The Branching Lineages of the Working Draft',
    collectionId: 'col-arch-arch',
    studyId: 'std-rev-systems',
    revision: 'REV 00',
    createdDate: '2026.07.05',
    publishedDate: '2026.07.05',
    location: 'Los Angeles',
    threadIds: ['t-info-arch', 't-archive'],
    relatedStudyIds: ['std-meta-labels'],
    visibility: 'published',
    summary: 'How working notes resist linear publishing and demand parallel state tracking.',
    contentBlocks: [
      {
        id: 'b-2-1',
        type: 'text',
        content:
          'A note is never a finished monument; it is a temporary clearing in the underbrush. If an author is forced to resolve every thought before publishing it, the most fragile, fruitful intuitions will simply never leave the private notebook. RUI preserves the dignity of the unfinished.',
      },
    ],
  },
  {
    id: 'entry-001',
    slug: 'entry-001-inaugural-laboratory-framework',
    entryNumber: '001',
    title: 'Inaugural Laboratory Framework and Indexing Charter',
    collectionId: 'col-arch-arch',
    studyId: 'std-meta-labels',
    revision: 'REV 00',
    createdDate: '2026.07.01',
    publishedDate: '2026.07.01',
    location: 'Los Angeles',
    threadIds: ['t-info-arch', 't-archive', 't-governance'],
    relatedStudyIds: ['std-rev-systems', 'std-mem-struct'],
    visibility: 'published',
    summary: 'The inaugural foundation text establishing ruigallery.xyz taxonomy rules.',
    contentBlocks: [
      {
        id: 'b-1-1',
        type: 'text',
        content:
          'We establish the Laboratory not as a decorative portfolio feed, but as an open-access research desk. Every observation recorded here is indexed by Collection, Study, and Entry number, cross-cut by conceptual Threads, and versioned by deliberate artistic Revisions.',
      },
      {
        id: 'b-1-2',
        type: 'quote',
        content: '“Archive before complexity. Metadata is rigid; content is flexible.”',
        source: 'RUI Operating Principles, § 1.1',
      },
    ],
  },
];

export const INITIAL_CURATED_WORKS: CuratedWork[] = [
  {
    id: 'work-arch-unfinished',
    slug: 'architecture-of-unfinished-thoughts',
    title: 'The Architecture of Unfinished Thoughts',
    subtitle: 'On the spatial, temporal, and taxonomic structures of working archives.',
    date: '2026',
    mediumType: 'Essay',
    heroImage:
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Dramatic architectural concrete space with dramatic natural light',
    excerpt:
      'A long-form inquiry into why digital portfolio platforms fail artists by demanding finished monuments rather than documenting the architecture of evolving cognition.',
    longContent: [
      'The modern digital interface was built to sell finished commodities. Whether an online shop, a streaming platform, or a slick creative portfolio, the visual language remains overwhelmingly identical: glossy thumbnails, frictionless scrolling, and the total suppression of the messy, painful drafting process.',
      'Yet for the artist, architect, and researcher, the true substance of intellectual labor resides almost entirely in the transitional state: the discarded sketch, the half-erased marginal note, the failed photographic contact sheet, the structural schema that refused to balance.',
      'In designing ruigallery.xyz, the objective was not to construct another pristine gallery showcase, but to create a dual-chamber ecosystem where finished creative works and raw laboratory explorations exist in dialectical tension.',
      'Here, finished works are not isolated islands of vanity; they carry visible umbilical cords to the Laboratory Studies and Entries that gave them birth. An essay is readable both as an independent aesthetic text and as the synthesis of three dozen field entries.',
    ],
    additionalMedia: [
      {
        id: 'm-arch-1',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
        caption: 'Monolithic concrete facade study, high contrast cast shadow.',
        layout: 'split',
        alt: 'Geometric modern architectural facade',
      },
      {
        id: 'm-arch-2',
        url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop',
        caption: 'Archival index card taxonomy draft and manuscript leaves.',
        layout: 'split',
        alt: 'Archival manuscript and notes',
      },
    ],
    relatedStudySlugs: ['metadata-labels', 'revision-systems'],
    relatedEntrySlugs: ['entry-004-metadata-labels-and-classification', 'entry-008-semantic-versioning-vs-revision-intent'],
    featuredOnHome: true,
    homeLayout: {
      scale: 'dominant',
      alignment: 'left',
      aspectRatio: 'landscape',
    },
  },
  {
    id: 'work-silent-dialect',
    slug: 'silent-dialect-chinatown-typographies',
    title: 'Silent Dialect: Vernacular Signage of the Diaspora',
    subtitle: 'Photographic and typographic documentation of Cantonese and Taishanese commercial enclaves.',
    date: '2025–2026',
    mediumType: 'Visual Study',
    heroImage:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Carved gold leaf Chinese calligraphy on weathered woodwork',
    excerpt:
      'A multi-year visual survey analyzing how migrant business owners, sign painters, and association elders engineered a hybrid bilingual typographic identity on North American streets.',
    longContent: [
      'Walking through the narrow alleyways of San Francisco, Los Angeles, and New York Chinatowns, one encounters a typographic palimpsest unlike anywhere else in the world.',
      'These signs were rarely designed by university-trained typographers; they were hand-cut by Cantonese carpenters, bent by local neon tube benders, and lettered by temple scribes using pig-hair brushes and imported gold leaf.',
      'The result is a complex visual dialect where traditional Kai-shu strokes meet mid-century American sans-serifs, producing idiosyncratic ligature behaviors and spatial proportions.',
      'This project documents over 300 surviving signs before urban redevelopment and demographic turnover erase their physical presence forever.',
    ],
    additionalMedia: [
      {
        id: 'm-sd-1',
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
        caption: 'Reverse-glass gold leaf lettering on Waverly Place balcony.',
        layout: 'full',
        alt: 'Reverse glass gilded typography',
      },
    ],
    relatedStudySlugs: ['vernacular-typography', 'dialect-phonology-archives'],
    relatedEntrySlugs: ['entry-014-bilingual-glass-gilding-wexford', 'entry-006-gold-mountain-guild-hall-transoms'],
    featuredOnHome: true,
    homeLayout: {
      scale: 'standard',
      alignment: 'right',
      aspectRatio: 'portrait',
    },
  },
  {
    id: 'work-topographies-stone',
    slug: 'topographies-of-stone-mediterranean',
    title: 'Topographies of Stone: Mediterranean Epigraphs',
    subtitle: 'High-contrast black and white photographic studies of ancient lapidary surfaces.',
    date: '2025',
    mediumType: 'Photography',
    heroImage:
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Fine detail of chiseled stone block and ancient mason marks',
    excerpt:
      'Tracing how chisel strokes, seismic ruptures, and marine lichen transform institutional imperial inscriptions into natural geological formations.',
    longContent: [
      'Stone is often assumed to be the ultimate medium of permanence. Yet when an imperial decree is carved into limestone and exposed to two thousand years of salt spray, wind, and industrial acid rain, the stone begins to reclaim its mineral autonomy.',
      'In this photographic portfolio, the camera approaches the marble slab not as an art-historical monument, but as a terrain of micro-fractures, lichens, and chisel impacts.',
      'The Latin and Greek letters become physical canyons where moisture gathers and algae flourishes.',
    ],
    additionalMedia: [
      {
        id: 'm-ts-1',
        url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop',
        caption: 'Roman Forum frieze detail, high-angle raking sunlight.',
        layout: 'split',
        alt: 'Close up of weathered ancient marble frieze',
      },
      {
        id: 'm-ts-2',
        url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=1200&auto=format&fit=crop',
        caption: 'Ink rubbing impression on mulberry paper, Ostia Antica funerary slab.',
        layout: 'split',
        alt: 'Mulberry ink rubbing on white paper',
      },
    ],
    relatedStudySlugs: ['epigraphs-and-stone'],
    relatedEntrySlugs: ['entry-003-rubbing-techniques-marble-friezes', 'entry-012-marseille-dockland-quarry-marks'],
    featuredOnHome: true,
    homeLayout: {
      scale: 'standard',
      alignment: 'left',
      aspectRatio: 'square',
    },
  },
  {
    id: 'work-systemic-memory',
    slug: 'systemic-memory-digital-scriptorium',
    title: 'Systemic Memory: Protocols for the Digital Scriptorium',
    subtitle: 'A critical monograph on non-linear taxonomic architecture.',
    date: '2024–2025',
    mediumType: 'Mixed Media',
    heroImage:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop',
    heroImageAlt: 'Archival library interior with wooden shelves and card drawers',
    excerpt:
      'Synthesizing medieval monastic filing models with modern schema design to propose an archival structure immune to platform lock-in.',
    longContent: [
      'How do we ensure that digital records survive not merely as raw binary blobs, but as intelligible intellectual structures?',
      'Examining the scriptoria of Saint Gall and Cluny, we discover that medieval scribes utilized an intricate multi-layered indexing system: color-coded rubrication, marginal manicules, and cross-volume concordances.',
      'This project translates those physical affordances into lightweight, human-readable data formats that remain independent of proprietary databases.',
    ],
    additionalMedia: [],
    relatedStudySlugs: ['metadata-labels', 'revision-systems'],
    relatedEntrySlugs: ['entry-010-index-card-ruling-density', 'entry-001-inaugural-laboratory-framework'],
    featuredOnHome: true,
    homeLayout: {
      scale: 'compact',
      alignment: 'right',
      aspectRatio: 'landscape',
    },
  },
];

export const AUTHOR_PROFILE: AuthorProfile = {
  name: 'RUI',
  cjkName: '睿',
  title: 'Artist, Architectural Researcher & Systems Designer',
  bioShort:
    'RUI operates at the intersection of archival architecture, vernacular typography, and digital knowledge systems. Working between Los Angeles, San Francisco, and Mediterranean field sites.',
  bioLong: [
    'RUI (睿, meaning foresight, profound wisdom, and deep perception) is the personal digital ecosystem and working archive of Person.',
    'Trained in architecture, information architecture, and comparative cultural history, RUI investigates the physical and digital infrastructures that shape cultural memory, linguistic survival, and institutional categorization.',
    'Rather than treating creative practice as an assortment of discrete, disconnected outputs, RUI treats finished works, exploratory field notebooks, and professional systems architecture as mutually informing dimensions of a singular intellectual discipline.',
  ],
  philosophy: [
    {
      heading: 'Archive Before Complexity',
      subheading: 'Preserving the provenance of thought',
      paragraphs: [
        'We believe that intellectual durability relies on clear, human-readable structural schemas rather than opaque algorithmic black boxes. A note written in plain text with consistent metadata will outlive any proprietary software platform by centuries.',
        'The Laboratory exists to preserve the provenance of thought: documenting not only what conclusions were reached, but the precise path of revisions, observations, and dead ends that preceded them.',
      ],
    },
    {
      heading: 'Metadata is Rigid; Content is Flexible',
      subheading: 'Structured outside, expressive inside',
      paragraphs: [
        'An archive must remain strictly searchable and traversable across institutional dimensions (Collection, Study, Entry, Revision, Location, Threads).',
        'However, once inside an Entry, the human thought must have total freedom of form: long-form prose, fragmented field logs, high-contrast photographic evidence, spectral recordings, and bibliographic citations all live naturally side-by-side.',
      ],
    },
    {
      heading: 'Equal Conceptual Legitimacy',
      subheading: 'Integrating artistic and professional labor',
      paragraphs: [
        'Professional work—architectural systems, schema engineering, institutional leadership, and strategic advisory—possesses equal intellectual gravity to gallery exhibitions and critical monographs.',
        'We reject the artificial segregation between commercial or institutional practice and private creative inquiry. Both require rigor, craftsmanship, and aesthetic clarity.',
      ],
    },
  ],
  contactEmail: 'studio@ruigallery.xyz',
  socials: [
    { label: 'Archive Index', handle: 'ruigallery.xyz/archive', url: '/archive' },
    { label: 'Laboratory', handle: 'ruigallery.xyz/laboratory', url: '/laboratory' },
    { label: 'Email', handle: 'studio@ruigallery.xyz', url: 'mailto:studio@ruigallery.xyz' },
    { label: 'Substack / Dispatch', handle: 'rui.archive.substack.com', url: 'https://substack.com' },
    { label: 'Repository', handle: 'github.com/rui-archive', url: 'https://github.com' },
  ],
  locations: ['Los Angeles, CA', 'San Francisco, CA', 'Venice / Marseille'],
};

export const INITIAL_PROFESSIONAL_ITEMS: ProfessionalItem[] = [
  {
    id: 'p-1',
    category: 'role',
    title: 'Lead Information Architect & Principal Systems Designer',
    organization: 'Spatial Memory Lab',
    role: 'Principal Investigator & Systems Lead',
    periodOrYear: '2023 — Present',
    location: 'Los Angeles / Remote',
    description:
      'Directing taxonomy design, knowledge graph architectures, and durable digital archival pipelines for cultural heritage institutions, university libraries, and private foundations.',
    tags: ['Information Architecture', 'Taxonomy', 'Archival Systems'],
  },
  {
    id: 'p-2',
    category: 'role',
    title: 'Visiting Critic & Lecturer in Spatial Taxonomies',
    organization: 'Southern California Institute of Architecture (SCI-Arc)',
    role: 'Lecturer',
    periodOrYear: '2024 — 2025',
    location: 'Los Angeles',
    description:
      'Taught seminar studios exploring the intersection of spatial indexing, vernacular typography in migrant corridors, and physical-to-digital archival methodologies.',
    tags: ['Pedagogy', 'Urbanism', 'Typography'],
  },
  {
    id: 'p-3',
    category: 'role',
    title: 'Senior Digital Archivist & Exhibition Architect',
    organization: 'Diaspora Heritage Trust',
    role: 'Senior Archivist',
    periodOrYear: '2021 — 2023',
    location: 'San Francisco, CA',
    description:
      'Spearheaded the physical preservation and high-resolution digital scanning of over 12,000 late 19th-century association records, gold-leaf shop signs, and audio reels across Northern California.',
    tags: ['Preservation', 'Chinatown Studies', 'Oral History'],
  },
  {
    id: 'p-4',
    category: 'project',
    title: 'The Waverly Place Transom Survey',
    organization: 'San Francisco Historic Preservation Commission & RUI',
    periodOrYear: '2025',
    location: 'San Francisco, CA',
    description:
      'Comprehensive photographic, epigraphic, and material condition survey of 42 surviving reverse-glass gilded commercial transoms in Chinatown historical core.',
    link: '/work/silent-dialect-chinatown-typographies',
    tags: ['Field Study', 'Typography', 'Conservation'],
  },
  {
    id: 'p-5',
    category: 'project',
    title: 'Project Scriptorium: Open Schema Protocol',
    organization: 'Independent Open Source Initiative',
    periodOrYear: '2024',
    location: 'Online',
    description:
      'Authored the JSON-LD schema specification and client libraries for portable, vendor-agnostic notebook archiving.',
    link: '/work/architecture-of-unfinished-thoughts',
    tags: ['Schema Design', 'Open Standards'],
  },
  {
    id: 'p-6',
    category: 'exhibition',
    title: 'Topographies of the Palimpsest: Stone and Script',
    organization: 'Galleria d’Arte Moderna Ca’ Pesaro',
    periodOrYear: '2025',
    location: 'Venice, Italy',
    description:
      'Solo exhibition presenting large-scale gelatin silver prints and mulberry ink rubbings of Roman and Venetian marine stonework.',
    tags: ['Photography', 'Exhibition'],
  },
  {
    id: 'p-7',
    category: 'exhibition',
    title: 'Neon & Kai-shu: Diasporic Street Scripts',
    organization: 'Chinese Historical Society of America Museum',
    periodOrYear: '2024',
    location: 'San Francisco, CA',
    description:
      'Curated group installation featuring restored neon transformers, historical association signboards, and typography specimen sheets.',
    tags: ['Exhibition', 'Curatorial'],
  },
  {
    id: 'p-8',
    category: 'publication',
    title: 'The Architecture of Unfinished Thoughts',
    organization: 'Cabinet Magazine / Architectural Review',
    periodOrYear: '2026',
    description:
      'Featured 14-page critical essay examining the crisis of digital archives and the aesthetic imperative of working notebooks.',
    tags: ['Monograph', 'Critical Essay'],
  },
  {
    id: 'p-9',
    category: 'publication',
    title: 'Inscribed Memory: Chisel and Lichen on the Mediterranean Coast',
    organization: 'Journal of Epigraphic Studies, Vol. 18',
    periodOrYear: '2025',
    description:
      'Peer-reviewed paper on laser scanning methodology and Song-style ink rubbing on travertine monuments.',
    tags: ['Academic Paper', 'Epigraphy'],
  },
];
