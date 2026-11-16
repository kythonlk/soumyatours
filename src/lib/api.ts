export interface TourPackage {
  id: string;
  store_id: string;
  title: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  duration_days: number;
  country: "Sri Lanka" | "India (Dambadiva)" | "Sri Lanka & India";
  price: number;
  compare_at_price: number | null;
  status: string;
  is_featured: boolean;
  category_name?: string;
  category_slug?: string;
  tags: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    highlights: string[];
  }>;
  images: Array<{
    id: string;
    url: string;
    alt_text: string;
    is_primary: boolean;
  }>;
  total_stock: number;
  avg_rating: number;
  review_count: number;
}

const API_BASE = import.meta.env.PUBLIC_API_URL || "http://76.13.221.75:9488/api/v1";
const STORE_ID = "store_saumya";

export const FALLBACK_TOURS: TourPackage[] = [
  {
    id: "smy-pkg-1",
    store_id: STORE_ID,
    title: "12-Day Sacred India Dambadiva Buddhist Pilgrimage from Sri Lanka",
    slug: "12-day-sacred-india-dambadiva-pilgrimage",
    sku: "SMY-DAM-12D",
    duration_days: 12,
    country: "India (Dambadiva)",
    description: "<p>The ultimate spiritual journey of a lifetime for Sri Lankan devotees. Trace the sacred footsteps of the Supreme Buddha across the holiest sites in northern India and southern Nepal.</p><p>Led by venerable Sinhala-speaking Buddhist monks and experienced pilgrimage coordinators. Every detail is seamlessly arranged: return international flights on SriLankan Airlines from Colombo, expedited Indian pilgrimage visas, 4-star AC accommodations, 3 wholesome freshly prepared Sri Lankan meals daily, special Bodhi pooja ceremonies, and AC luxury coach transport throughout the sacred circuit.</p>",
    short_description: "All-inclusive 12-day sacred Dambadiva Buddhist circuit from Colombo with Sinhala guide & full board.",
    price: 285000,
    compare_at_price: 320000,
    status: "active",
    is_featured: true,
    category_name: "India Dambadiva Pilgrimages",
    category_slug: "dambadiva-pilgrimages",
    tags: ["dambadiva", "india tour", "buddhist pilgrimage", "bodh gaya", "sri lanka to india"],
    inclusions: [
      "Direct return flights from Colombo (SriLankan Airlines)",
      "All Indian pilgrimage visa fees & documentation",
      "4-Star AC hotel stays in Bodh Gaya, Varanasi, Kushinagar, Rajgir",
      "3 authentic Sri Lankan buffet meals daily prepared by tour chefs",
      "Sinhala-speaking senior Buddhist monk guidance and daily pirith chanting",
      "All temple entrance permits, audio guides, and flower offering arrangements",
      "Luxury air-conditioned Mercedes-Benz coach throughout India"
    ],
    exclusions: [
      "Personal telephone calls & laundry expenses",
      "Individual camera fees at specific monuments"
    ],
    itinerary: [
      {
        day: 1,
        title: "Colombo to Bodh Gaya – Arrival in the Holy Land",
        description: "Depart Bandaranaike International Airport (CMB) on morning flight. Arrive at Gaya International Airport. Warm traditional reception, transfer to 4-star hotel in Bodh Gaya, evening introductory pirith and rest.",
        highlights: ["Flight from CMB", "Check-in at Bodh Gaya", "Evening orientation"]
      },
      {
        day: 2,
        title: "Mahabodhi Temple & The Sacred Vajrasana (Diamond Throne)",
        description: "Full day dedicated to the sacred Mahabodhi Mahavihara and the Holy Bodhi Tree. Participate in a private collective Sanghadana and gold foil offering at the Vajrasana.",
        highlights: ["Holy Bodhi Tree Meditation", "Vajrasana Offering", "Mahabodhi Chanting"]
      },
      {
        day: 3,
        title: "Sujatha Kuti & Dungeshwari Cave (Mahakala Mountain)",
        description: "Visit the residence of Sujatha who offered the sweet milk rice, followed by pilgrimage to Dungeshwari Caves where the Bodhisattva practiced six years of ascetic penance.",
        highlights: ["Sujatha Stupa", "Dungeshwari Caves", "Niranjana River"]
      },
      {
        day: 4,
        title: "Varanasi & Sarnath – The First Turning of the Wheel of Dhamma",
        description: "Travel to ancient Varanasi. Visit Sarnath Deer Park and Damekh Stupa where the Buddha preached the Dhammacakkappavattana Sutta. Evening serene boat ride on Mother Ganga.",
        highlights: ["Damekh Stupa", "Ashoka Pillar at Sarnath", "Ganges Twilight Boat Ride"]
      },
      {
        day: 5,
        title: "Kushinagar – The Sacred Site of Maha Parinirvana",
        description: "Journey to Kushinagar. Worship at the Parinirvana Temple housing the recumbent Buddha statue draped in saffron robes, and the Ramabhar Stupa (cremation shrine).",
        highlights: ["Parinirvana Temple", "Ramabhar Stupa", "Robes Offering"]
      },
      {
        day: 6,
        title: "Lumbini (Nepal) – The Sacred Birthplace",
        description: "Cross into Nepal to the sacred Maya Devi Temple at Lumbini. Witness the marker stone of the Buddha’s birth, the sacred Pushkarini pond, and Ashoka Pillar.",
        highlights: ["Maya Devi Temple", "Lumbini Garden", "Ashoka Edict Pillar"]
      },
      {
        day: 7,
        title: "Sravasti – Jetavana Monastery & Ananda Bodhi Tree",
        description: "Visit the Jetavana Monastery where the Buddha spent 24 rainy seasons. Meditate beneath the sacred Ananda Bodhi Tree and visit the Gandhakuti fragrance chamber.",
        highlights: ["Jetavana Vihara", "Ananda Bodhi Tree", "Gandhakuti Shrine"]
      },
      {
        day: 8,
        title: "Rajgir – Vulture's Peak (Gridhrakuta) & Bimbisara Jail",
        description: "Ascend Gridhrakuta Hill where the Heart Sutta and Lotus Sutta were expounded. Visit the Venuvana Bamboo Grove and King Bimbisara’s historical jail.",
        highlights: ["Gridhrakuta Peak", "Venuvana Bamboo Grove", "Ropeway to Peace Pagoda"]
      },
      {
        day: 9,
        title: "Ancient Nalanda University – World's First Buddhist Seat of Learning",
        description: "Explore the ruins of Nalanda Mahavihara, the legendary seat of Buddhist scholarship founded in the 5th century CE. Visit Sariputta Stupa.",
        highlights: ["Nalanda Ruins", "Sariputta Stupa", "Archaeological Museum"]
      },
      {
        day: 10,
        title: "Vaishali – Ananda Stupa & Relic Shrine",
        description: "Pilgrimage to Vaishali, site of the Second Buddhist Council and where the Buddha delivered his last sermon. Visit the Kutagarasala Vihara.",
        highlights: ["Ananda Stupa", "Lion Pillar of Ashoka", "Vaishali Relic Stupa"]
      },
      {
        day: 11,
        title: "Return to Bodh Gaya – Gratitude Pooja & Dana",
        description: "Return to Bodh Gaya for final evening illumination with 1,000 oil lamps beneath the Bodhi Tree. Grand collective merit-sharing (Punya Anumodana).",
        highlights: ["1,000 Oil Lamp Illumination", "Grand Sanghadana", "Final Meditation"]
      },
      {
        day: 12,
        title: "Bodh Gaya to Colombo – Blessed Homecoming",
        description: "Morning blessings at the temple, transfer to Gaya Airport, and return flight to Colombo. Arrive in Sri Lanka enriched with merit and peaceful memories.",
        highlights: ["Direct flight to Colombo CMB", "Merit distribution"]
      }
    ],
    images: [
      { id: "img-1", url: "/images/dambadiva.jpg", alt_text: "12-Day Sacred India Dambadiva Pilgrimage", is_primary: true },
      { id: "img-1b", url: "/images/hero-banner.jpg", alt_text: "Mahabodhi Temple Bodh Gaya", is_primary: false }
    ],
    total_stock: 24,
    avg_rating: 5.0,
    review_count: 73
  },
  {
    id: "smy-pkg-2",
    store_id: STORE_ID,
    title: "7-Day Wonders of Sri Lanka: Sigiriya, Kandy, Ella & Yala Safari",
    slug: "7-day-wonders-of-sri-lanka-tour",
    sku: "SMY-SL-07D",
    duration_days: 7,
    country: "Sri Lanka",
    description: "<p>The premier luxury Sri Lanka holiday itinerary. Climb the 5th-century UNESCO Sigiriya Lion Rock Fortress, visit the golden cave temples of Dambulla, witness sacred evening pooja at Kandy’s Temple of the Sacred Tooth Relic, ride the iconic blue observation train across Nine Arch Bridge, and enjoy a thrilling 4x4 leopard safari in Yala National Park.</p><p>Accompanied by a government-licensed professional chauffeur-guide in a luxury private vehicle with complimentary Wi-Fi and chilled refreshments throughout.</p>",
    short_description: "7-day luxury Sri Lanka highlights tour covering Sigiriya, Kandy, Ella, and Yala safari.",
    price: 165000,
    compare_at_price: 195000,
    status: "active",
    is_featured: true,
    category_name: "Sri Lanka Inbound Tours",
    category_slug: "sri-lanka-tours",
    tags: ["sri lanka", "sigiriya", "kandy", "ella train", "holiday tour", "yala"],
    inclusions: [
      "Private luxury AC vehicle with dedicated English/Sinhala tourist chauffeur",
      "6 nights at 4-star boutique hotels & heritage tea bungalows",
      "Daily gourmet buffet breakfasts & dinners",
      "Reserved 1st class observation seats on the Ella blue train",
      "Private 4x4 safari jeep with experienced Yala tracker",
      "All entry tickets to Sigiriya, Dambulla Caves, Temple of Tooth & Yala"
    ],
    exclusions: [
      "International flights to/from Sri Lanka",
      "Alcoholic beverages & personal tips"
    ],
    itinerary: [
      {
        day: 1,
        title: "Colombo Arrival & Transfer to Cultural Triangle",
        description: "Welcome at CMB Airport. Scenic drive to Sigiriya through lush coconut estates. Evening relaxation at forest eco-resort.",
        highlights: ["Private Airport Pickup", "Sigiriya Eco-Resort", "Welcome Dinner"]
      },
      {
        day: 2,
        title: "Sigiriya Lion Rock Fortress & Village Safari",
        description: "Early morning climb of the 200m monolithic palace rock fortress. Afternoon authentic bullock cart ride and traditional clay pot lunch.",
        highlights: ["Sigiriya Sky Palace & Frescoes", "Hiriwadunna Village Tour", "Ayurvedic Spa"]
      },
      {
        day: 3,
        title: "Dambulla Golden Caves & Kandy Royal Heritage",
        description: "Explore the ancient Buddhist cave temples of Dambulla. Continue to the hill capital Kandy. Witness the sacred evening Tevava ceremony at the Temple of the Tooth.",
        highlights: ["Dambulla Cave Monasteries", "Kandy Lake Walk", "Temple of the Tooth Relic"]
      },
      {
        day: 4,
        title: "Scenic Train Ride to Ella & Tea Plantation Estate",
        description: "Board the world-famous blue train through misty pine forests and tea carpeted mountains. Walk over the iconic Demodara Nine Arch Bridge.",
        highlights: ["Ella Blue Mountain Train", "Nine Arch Bridge", "Little Adam’s Peak Sunset"]
      },
      {
        day: 5,
        title: "Ravana Falls & Yala National Park Leopard Safari",
        description: "Descend into the southern lowlands via Ravana Waterfalls. Afternoon private 4x4 game drive in Yala to track leopards, sloth bears, and wild elephants.",
        highlights: ["Ravana Falls", "Yala Leopard 4x4 Safari", "Luxury Tented Camp"]
      },
      {
        day: 6,
        title: "Galle Dutch Fort UNESCO Heritage & Mirissa Beach",
        description: "Drive along the southern coast. Guided walking tour through the 17th-century cobblestone alleys of Galle Fort. Sunset cocktail on Mirissa beach.",
        highlights: ["Galle Dutch Fort", "Lighthouse Walk", "Southern Golden Beach"]
      },
      {
        day: 7,
        title: "Colombo City Highlights & Airport Farewell",
        description: "Colombo architectural city drive (Independence Square, Old Parliament). Souvenir shopping at Barefoot & Laksala before airport departure.",
        highlights: ["Colombo City Heritage", "Handicrafts Shopping", "Airport Drop-off"]
      }
    ],
    images: [
      { id: "img-2", url: "/images/hero-banner.jpg", alt_text: "7-Day Wonders of Sri Lanka Tour", is_primary: true }
    ],
    total_stock: 30,
    avg_rating: 4.96,
    review_count: 58
  },
  {
    id: "smy-pkg-3",
    store_id: STORE_ID,
    title: "10-Day India Dambadiva Classic Pilgrimage Circuit",
    slug: "10-day-india-dambadiva-classic-pilgrimage",
    sku: "SMY-DAM-10D",
    duration_days: 10,
    country: "India (Dambadiva)",
    description: "<p>A focused, deeply fulfilling 10-day pilgrimage for Sri Lankan families covering the primary four holiest sites (Char Dham): Bodh Gaya, Sarnath, Kushinagar, and Lumbini, alongside Rajgir and Nalanda.</p><p>Includes Colombo return airfare, experienced guides, AC coach, and delicious Sri Lankan full board hospitality.</p>",
    short_description: "Essential 10-day Buddhist pilgrimage circuit from Colombo with full board and Sinhala leader.",
    price: 245000,
    compare_at_price: 275000,
    status: "active",
    is_featured: false,
    category_name: "India Dambadiva Pilgrimages",
    category_slug: "dambadiva-pilgrimages",
    tags: ["dambadiva", "india tour", "buddhist pilgrimage", "sri lanka to india"],
    inclusions: [
      "Colombo direct flights & Indian pilgrimage visas",
      "3 daily Sri Lankan meals cooked by accompanied culinary staff",
      "All Buddhist shrine entrance permits and floral pooja offerings",
      "Air-conditioned hotel stays and deluxe coach travel"
    ],
    exclusions: ["Personal phone/porterage"],
    itinerary: [
      { day: 1, title: "Colombo to Bodh Gaya", description: "Flight arrival, transfer to hotel, evening Bodhi Tree prayers.", highlights: ["Arrival", "Bodhi Tree"] },
      { day: 2, title: "Bodh Gaya Deep Worship", description: "Sanghadana at Vajrasana and meditation at Sujatha Kuti.", highlights: ["Vajrasana", "Sujatha Kuti"] },
      { day: 3, title: "Rajgir & Nalanda University", description: "Ascend Vulture's Peak and walk through Nalanda ruins.", highlights: ["Gridhrakuta", "Nalanda"] },
      { day: 4, title: "Varanasi & Sarnath Deer Park", description: "Damekh Stupa where the First Sermon was expounded.", highlights: ["Sarnath", "Damekh Stupa"] },
      { day: 5, title: "Kushinagar Parinirvana Temple", description: "Worship at the recumbent Buddha Parinirvana shrine.", highlights: ["Parinirvana Shrine", "Ramabhar"] },
      { day: 6, title: "Lumbini Birthplace Pilgrimage", description: "Maya Devi shrine and sacred Pushkarini pond.", highlights: ["Lumbini Garden", "Maya Devi"] },
      { day: 7, title: "Sravasti Jetavana Monastery", description: "Ananda Bodhi Tree and Gandhakuti meditation.", highlights: ["Jetavana", "Ananda Bodhi"] },
      { day: 8, title: "Vaishali Relic Stupa", description: "Ananda Stupa and Second Council assembly grounds.", highlights: ["Vaishali", "Ashoka Pillar"] },
      { day: 9, title: "Bodh Gaya Farewell Illumination", description: "Offer 500 oil lamps and chant evening pirith.", highlights: ["Oil Lamps", "Punya Anumodana"] },
      { day: 10, title: "Bodh Gaya to Colombo Departure", description: "Return flight to Colombo CMB with sacred relics.", highlights: ["Flight to Colombo"] }
    ],
    images: [
      { id: "img-3", url: "/images/dambadiva.jpg", alt_text: "10-Day India Dambadiva Classic Tour", is_primary: true }
    ],
    total_stock: 20,
    avg_rating: 4.95,
    review_count: 46
  },
  {
    id: "smy-pkg-4",
    store_id: STORE_ID,
    title: "3-Day Yala Leopard Safari & Southern Galle Coast Getaway",
    slug: "3-day-yala-leopard-safari-galle",
    sku: "SMY-SAF-03D",
    duration_days: 3,
    country: "Sri Lanka",
    description: "<p>Private weekend escape featuring 2 game drives in Yala National Park (Sector 1) renowned for world's highest leopard density, followed by luxury coastal boutique hotel stay and Galle Fort heritage discovery.</p>",
    short_description: "3-day private 4x4 wildlife safari in Yala with Galle Dutch Fort coastal exploration.",
    price: 78000,
    compare_at_price: 92000,
    status: "active",
    is_featured: false,
    category_name: "Day Excursions & Safaris",
    category_slug: "day-excursions",
    tags: ["safari", "yala", "wildlife", "galle", "beach"],
    inclusions: [
      "Private 4x4 safari jeep with park tracker",
      "2 nights 4-star boutique hotel with breakfast & dinner",
      "All park permits and wildlife conservation taxes"
    ],
    exclusions: ["Tips for driver & tracker"],
    itinerary: [
      { day: 1, title: "Colombo to Yala", description: "Morning departure, afternoon check-in, dusk game drive.", highlights: ["Yala Dusk Safari", "Luxury Camp"] },
      { day: 2, title: "Dawn Game Drive & Galle", description: "Dawn leopard tracking, scenic drive to Galle Dutch Fort.", highlights: ["Dawn Safari", "Galle Fort Sunset"] },
      { day: 3, title: "Southern Coast to Colombo", description: "Stilt fishermen photography, turtle hatchery, return to Colombo.", highlights: ["Stilt Fishermen", "Colombo Return"] }
    ],
    images: [
      { id: "img-4", url: "/images/hero-banner.jpg", alt_text: "3-Day Yala Leopard Safari", is_primary: true }
    ],
    total_stock: 40,
    avg_rating: 4.9,
    review_count: 34
  }
];

export async function getTours(categorySlug?: string): Promise<TourPackage[]> {
  try {
    const res = await fetch(`${API_BASE}/products`, {
      headers: { "X-Store-ID": STORE_ID },
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        const mapped: TourPackage[] = json.data.map((p: any) => {
          const matchingFallback = FALLBACK_TOURS.find(f => f.slug === p.slug);
          return {
            ...p,
            duration_days: matchingFallback?.duration_days || 7,
            country: matchingFallback?.country || "Sri Lanka",
            inclusions: matchingFallback?.inclusions || [
              "Private luxury transport with licensed guide",
              "Deluxe hotel accommodation & all daily meals",
              "All entrance permits and government taxes"
            ],
            exclusions: matchingFallback?.exclusions || ["Personal expenses & tips"],
            itinerary: matchingFallback?.itinerary || [
              { day: 1, title: "Arrival & Welcome", description: "Scenic transfer and orientation.", highlights: ["Check-in", "Dinner"] },
              { day: 2, title: "Exploration & Excursions", description: "Guided tour of key monuments.", highlights: ["Monuments", "Sightseeing"] }
            ],
            images: p.images && p.images.length > 0 ? p.images.map((img: any) => ({
              ...img,
              url: img.url.startsWith("/uploads/") ? img.url.replace("/uploads/", "/images/") : img.url
            })) : [{ id: "def", url: "/images/dambadiva.jpg", alt_text: p.title, is_primary: true }]
          };
        });
        if (categorySlug) {
          return mapped.filter(p => p.category_slug === categorySlug || p.tags?.includes(categorySlug));
        }
        return mapped;
      }
    }
  } catch (err) {
    console.warn("Backend API offline or slow, using resilient Saumya Tours catalog fallback", err);
  }

  if (categorySlug) {
    return FALLBACK_TOURS.filter(p => p.category_slug === categorySlug || p.tags.includes(categorySlug));
  }
  return FALLBACK_TOURS;
}

export async function getTourBySlug(slug: string): Promise<TourPackage | undefined> {
  const all = await getTours();
  return all.find(p => p.slug === slug) || FALLBACK_TOURS.find(p => p.slug === slug);
}
