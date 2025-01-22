export const categories = [
	{
		id: 1,
		header: "Phone Cases",
		items: [
			{
				name: "iPhone Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tags=iphone-cases",
			},
			{
				name: "Galaxy Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tags=galaxy-cases",
			},
			{
				name: "OnePlus Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tag=oneplus-cases",
			},
			{
				name: "Pixel Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tag=pixel-cases",
			},
			{
				name: "Clear Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tag=clear-cases",
			},
			{
				name: "Leather Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tag=leather-cases",
			},
			{
				name: "Rugged Cases",
				href: "/collection?category=phone-cases&sortBy=price&sortOrder=desc&limit=50&page=1&tag=rugged-cases",
			},
		],
	},
	{
		id: 2,
		header: "Screen Protectors",
		items: [
			{ name: "Tempered Glass", href: "/tempered-glass" },
			{ name: "Privacy Screen Protectors", href: "/privacy-screen-protectors" },
			{ name: "Anti-Glare Protectors", href: "/anti-glare-protectors" },
			{ name: "Self-Healing Protectors", href: "/self-healing-protectors" },
		],
	},
	{
		id: 3,
		header: "Chargers & Cables",
		items: [
			{ name: "Fast Chargers", href: "/fast-chargers" },
			{ name: "Wireless Chargers", href: "/wireless-chargers" },
			{ name: "USB-C Cables", href: "/usb-c-cables" },
			{ name: "Lightning Cables", href: "/lightning-cables" },
			{ name: "Car Chargers", href: "/car-chargers" },
			{ name: "Multi-Port Chargers", href: "/multi-port-chargers" },
		],
	},
	{
		id: 4,
		header: "Earphones & Headphones",
		items: [
			{ name: "AirPods", href: "/airpods" },
			{ name: "Galaxy Buds", href: "/galaxy-buds" },
			{ name: "Wireless Earbuds", href: "/wireless-earbuds" },
			{
				name: "Noise-Cancelling Headphones",
				href: "/noise-cancelling-headphones",
			},
			{ name: "Sports Earphones", href: "/sports-earphones" },
		],
	},
	{
		id: 5,
		header: "Power Banks",
		items: [
			{ name: "20,000mAh Power Banks", href: "/20000mah-power-banks" },
			{ name: "10,000mAh Power Banks", href: "/10000mah-power-banks" },
			{ name: "Slim Power Banks", href: "/slim-power-banks" },
			{ name: "Solar Power Banks", href: "/solar-power-banks" },
		],
	},
	{
		id: 6,
		header: "Smartwatch Accessories",
		items: [
			{ name: "Apple Watch Bands", href: "/apple-watch-bands" },
			{ name: "Galaxy Watch Bands", href: "/galaxy-watch-bands" },
			{ name: "Charging Docks", href: "/charging-docks" },
			{ name: "Screen Protectors", href: "/smartwatch-screen-protectors" },
		],
	},
];

export const filterData = {
	"Phone Cases": {
		Apple: [
			"iPhone 14 Pro Max",
			"iPhone 14 Pro",
			"iPhone 14",
			"iPhone 13 Pro Max",
			"iPhone 13 Pro",
			"iPhone 13",
			"iPhone 12 Pro Max",
			"iPhone 12 Pro",
			"iPhone 12",
			"iPhone 11 Pro Max",
			"iPhone 11 Pro",
			"iPhone 11",
		],
		Samsung: [
			"Galaxy S23 Ultra",
			"Galaxy S23+",
			"Galaxy S23",
			"Galaxy Z Fold 4",
			"Galaxy Z Flip 4",
			"Galaxy A54 5G",
			"Galaxy A34 5G",
			"Galaxy A14 5G",
			"Galaxy A73 5G",
			"Galaxy A53 5G",
			"Galaxy A33 5G",
			"Galaxy A13",
			"Galaxy A04s",
			"Galaxy M53 5G",
			"Galaxy M33 5G",
			"Galaxy M13",
			"Galaxy F14 5G",
			"Galaxy F04",
		],
		Google: ["Pixel 7 Pro", "Pixel 7", "Pixel 6a", "Pixel 6", "Pixel 5"],
		Infinix: [
			"Infinix Zero 30 5G",
			"Infinix Zero 20",
			"Infinix Note 30 VIP",
			"Infinix Note 30 Pro",
			"Infinix Note 30",
			"Infinix Hot 30",
			"Infinix Smart 8",
			"Infinix GT 10 Pro",
		],
		Tecno: [
			"Tecno Camon 20 Pro 5G",
			"Tecno Camon 20 Pro",
			"Tecno Camon 20",
			"Tecno Phantom V Fold",
			"Tecno Phantom X2 Pro",
			"Tecno Spark 10 Pro",
			"Tecno Spark 10",
			"Tecno Pova 5 Pro",
			"Tecno Pova 5",
		],
		Xiaomi: [
			"Xiaomi 13 Pro",
			"Xiaomi 13",
			"Xiaomi 12T Pro",
			"Xiaomi 12T",
			"Xiaomi Redmi Note 12 Pro+",
			"Xiaomi Redmi Note 12 Pro",
			"Xiaomi Redmi Note 12",
			"Xiaomi Redmi 12",
		],
		Oppo: [
			"Oppo Find X6 Pro",
			"Oppo Find X6",
			"Oppo Reno 10 Pro+",
			"Oppo Reno 10 Pro",
			"Oppo Reno 10",
			"Oppo A98 5G",
			"Oppo A78 5G",
			"Oppo A58",
		],
		Vivo: [
			"Vivo X90 Pro",
			"Vivo X90",
			"Vivo V29 Pro",
			"Vivo V29",
			"Vivo V27",
			"Vivo Y36",
			"Vivo Y27",
			"Vivo Y16",
		],
		Realme: [
			"Realme GT 3",
			"Realme GT Neo 5",
			"Realme 11 Pro+",
			"Realme 11 Pro",
			"Realme 11",
			"Realme Narzo 60 Pro",
			"Realme Narzo 60",
			"Realme C55",
		],
	},
	"AirPod Cases": {
		"AirPods Pro": ["AirPods Pro 2nd Gen", "AirPods Pro 1st Gen"],
		AirPods: ["AirPods 3rd Gen", "AirPods 2nd Gen", "AirPods 1st Gen"],
	},
	Chargers: {
		"Wall Chargers": [
			"20W USB-C Fast Charger",
			"30W USB-C Fast Charger",
			"65W GaN Charger",
		],
		"Car Chargers": [
			"12V USB-C Car Charger",
			"24W Dual Port Car Charger",
			"36W USB-C Car Charger",
		],
		"Wireless Chargers": [
			"10W Qi Wireless Charger",
			"15W MagSafe Charger",
			"20W Fast Wireless Charger",
		],
	},
	"Watch Straps": {
		"Apple Watch": [
			"Solo Loop",
			"Braided Solo Loop",
			"Sport Band",
			"Leather Link",
			"Milanese Loop",
		],
		"Samsung Watch": [
			"Elastic Sport Band",
			"Hybrid Leather Band",
			"Metal Link Bracelet",
			"Silicone Band",
		],
	},
	"Watch Protectors": {
		"Apple Watch": [
			"Series 8 (45mm) Tempered Glass",
			"Series 8 (41mm) Tempered Glass",
			"Series 7 (45mm) Tempered Glass",
			"Series 7 (41mm) Tempered Glass",
			"SE 2nd Gen Tempered Glass",
		],
		"Samsung Watch": [
			"Galaxy Watch 5 Pro Tempered Glass",
			"Galaxy Watch 5 Tempered Glass",
			"Galaxy Watch 4 Tempered Glass",
		],
	},
};

export const categoryItems = [
	{
		id: 1,
		name: "phone cases",
		search: "phone-cases",
		image: "/images/MA7E4.png",
	},
	// {
	// 	id: 2,
	// 	name: "screen protectors",
	// 	search: "screen-protectors",
	// 	image: "/images/HRZE2_AV4.jpg",
	// },
	{
		id: 3,
		name: "chargers ",
		search: "chargers",
		image: "/images/MU7T2_GEO_US.png",
	},
	{
		id: 4,
		name: "airpod cases",
		search: "airpod-cases",
		image: "/images/airpod.jpeg",
	},
	// {
	// 	id: 5,
	// 	name: "power banks",
	// 	search: "power-banks",
	// 	image: "/images/MM0A3.png",
	// },
	{
		id: 6,
		name: "watch straps",
		search: "watch-straps",
		image: "/images/MYP83ref.png",
	},
	{
		id: 7,
		name: "adapters",
		search: "adapters",
		image: "/images/MUF82.png",
	},
	// {
	// 	id: 8,
	// 	name: "watch protectors",
	// 	search: "watch-protectors",
	// 	image: "/images/MUF82.png",
	// },
];

export const SelectCategories = [
	{
		label: "Phone Cases & Covers",
		items: [
			{
				label: "Phone Cases",
				value: "phone-cases",
				subcategories: [
					{ label: "Silicone Cases", value: "silicone-cases" },
					{ label: "Leather Cases", value: "leather-cases" },
					{ label: "Clear Cases", value: "clear-cases" },
					{ label: "Rugged Cases", value: "rugged-cases" },
					{ label: "Wallet Cases", value: "wallet-cases" },
					{ label: "Bumper Cases", value: "bumper-cases" },
					{ label: "Designer Cases", value: "designer-cases" },
				],
			},
			{
				label: "Screen Protectors",
				value: "screen-protectors",
				subcategories: [
					{ label: "Tempered Glass", value: "tempered-glass" },
					{ label: "Plastic Film", value: "plastic-film" },
					{ label: "Privacy Screen Protectors", value: "privacy-protectors" },
					{ label: "Anti-Glare Protectors", value: "anti-glare-protectors" },
				],
			},
			{
				label: "Camera Lens Protectors",
				value: "camera-protectors",
				subcategories: [
					{ label: "Single Lens Protectors", value: "single-lens-protectors" },
					{ label: "Dual Lens Protectors", value: "dual-lens-protectors" },
					{ label: "Triple Lens Protectors", value: "triple-lens-protectors" },
				],
			},
			{
				label: "Back Films",
				value: "protective-films",
				subcategories: [
					{ label: "Matte Finish", value: "matte-finish" },
					{ label: "Glossy Finish", value: "glossy-finish" },
					{ label: "Carbon Fiber", value: "carbon-fiber" },
				],
			},
		],
	},
	{
		label: "Power & Charging",
		items: [
			{
				label: "Charging Cables",
				value: "charging-cables",
				subcategories: [
					{ label: "USB-C Cables", value: "usb-c-cables" },
					{ label: "Lightning Cables", value: "lightning-cables" },
					{ label: "Micro-USB Cables", value: "micro-usb-cables" },
					{ label: "Braided Cables", value: "braided-cables" },
				],
			},
			{
				label: "Wall Chargers",
				value: "wall-chargers",
				subcategories: [
					{ label: "Fast Chargers", value: "fast-chargers" },
					{ label: "Multi-Port Chargers", value: "multi-port-chargers" },
					{ label: "Compact Chargers", value: "compact-chargers" },
				],
			},
			{
				label: "Wireless Chargers",
				value: "wireless-chargers",
				subcategories: [
					{ label: "Stand Chargers", value: "stand-chargers" },
					{ label: "Pad Chargers", value: "pad-chargers" },
					{ label: "Fast Wireless Chargers", value: "fast-wireless-chargers" },
				],
			},
			{
				label: "Car Chargers",
				value: "car-chargers",
				subcategories: [
					{
						label: "Single Port Car Chargers",
						value: "single-port-car-chargers",
					},
					{ label: "Dual Port Car Chargers", value: "dual-port-car-chargers" },
					{ label: "Fast Car Chargers", value: "fast-car-chargers" },
				],
			},
			{
				label: "Power Banks",
				value: "power-banks",
				subcategories: [
					{ label: "Portable Power Banks", value: "portable-power-banks" },
					{ label: "Solar Power Banks", value: "solar-power-banks" },
					{
						label: "High-Capacity Power Banks",
						value: "high-capacity-power-banks",
					},
				],
			},
		],
	},
	{
		label: "Mounts & Holders",
		items: [
			{
				label: "Car Mounts",
				value: "car-mounts",
				subcategories: [
					{ label: "Magnetic Car Mounts", value: "magnetic-car-mounts" },
					{ label: "Vent Mounts", value: "vent-mounts" },
					{ label: "Dashboard Mounts", value: "dashboard-mounts" },
				],
			},
			{
				label: "Desk Stands",
				value: "desk-stands",
				subcategories: [
					{ label: "Adjustable Stands", value: "adjustable-stands" },
					{ label: "Charging Stands", value: "charging-stands" },
					{ label: "Foldable Stands", value: "foldable-stands" },
				],
			},
			{
				label: "Phone Grips & Rings",
				value: "phone-grips",
				subcategories: [
					{ label: "Pop Sockets", value: "pop-sockets" },
					{ label: "Ring Holders", value: "ring-holders" },
					{ label: "Adhesive Grips", value: "adhesive-grips" },
				],
			},
			{
				label: "Bike Mounts",
				value: "bike-mounts",
				subcategories: [
					{ label: "Handlebar Mounts", value: "handlebar-mounts" },
					{ label: "Stem Mounts", value: "stem-mounts" },
					{ label: "Waterproof Mounts", value: "waterproof-mounts" },
				],
			},
		],
	},
	{
		label: "Audio Accessories",
		items: [
			{
				label: "Airpod Cases",
				value: "airpod-cases",
				subcategories: [
					{ label: "Silicone Cases", value: "silicone-airpod-cases" },
					{ label: "Leather Cases", value: "leather-airpod-cases" },
					{ label: "Hard Shell Cases", value: "hard-shell-airpod-cases" },
				],
			},
			{
				label: "Bluetooth Earphones",
				value: "bluetooth-earphones",
				subcategories: [
					{ label: "In-Ear Earphones", value: "in-ear-earphones" },
					{ label: "Over-Ear Earphones", value: "over-ear-earphones" },
					{
						label: "Noise-Cancelling Earphones",
						value: "noise-cancelling-earphones",
					},
				],
			},
			{
				label: "Audio Adapters",
				value: "audio-adapters",
				subcategories: [
					{
						label: "USB-C to 3.5mm Adapters",
						value: "usb-c-to-3.5mm-adapters",
					},
					{
						label: "Lightning to 3.5mm Adapters",
						value: "lightning-to-3.5mm-adapters",
					},
					{ label: "Bluetooth Transmitters", value: "bluetooth-transmitters" },
				],
			},
			{
				label: "Earphone Cases",
				value: "earphone-cases",
				subcategories: [
					{ label: "Zipper Cases", value: "zipper-cases" },
					{ label: "Hard Cases", value: "hard-cases" },
					{ label: "Soft Pouch Cases", value: "soft-pouch-cases" },
				],
			},
		],
	},
	{
		label: "Camera Accessories",
		items: [
			{
				label: "Camera Lenses",
				value: "camera-lenses",
				subcategories: [
					{ label: "Wide-Angle Lenses", value: "wide-angle-lenses" },
					{ label: "Macro Lenses", value: "macro-lenses" },
					{ label: "Fisheye Lenses", value: "fisheye-lenses" },
				],
			},
			{
				label: "Selfie Sticks",
				value: "selfie-sticks",
				subcategories: [
					{
						label: "Bluetooth Selfie Sticks",
						value: "bluetooth-selfie-sticks",
					},
					{ label: "Wired Selfie Sticks", value: "wired-selfie-sticks" },
					{
						label: "Extendable Selfie Sticks",
						value: "extendable-selfie-sticks",
					},
				],
			},
			{
				label: "Camera Stabilizers",
				value: "camera-stabilizers",
				subcategories: [
					{ label: "Handheld Gimbals", value: "handheld-gimbals" },
					{ label: "Tripod Stabilizers", value: "tripod-stabilizers" },
					{ label: "Wearable Stabilizers", value: "wearable-stabilizers" },
				],
			},
			{
				label: "Phone Tripods",
				value: "tripods",
				subcategories: [
					{ label: "Mini Tripods", value: "mini-tripods" },
					{ label: "Flexible Tripods", value: "flexible-tripods" },
					{ label: "Tabletop Tripods", value: "tabletop-tripods" },
				],
			},
		],
	},
	{
		label: "Storage & Connectivity",
		items: [
			{
				label: "Memory Cards",
				value: "memory-cards",
				subcategories: [
					{ label: "MicroSD Cards", value: "microsd-cards" },
					{ label: "SD Cards", value: "sd-cards" },
					{
						label: "High-Speed Memory Cards",
						value: "high-speed-memory-cards",
					},
				],
			},
			{
				label: "OTG Adapters",
				value: "otg-adapters",
				subcategories: [
					{ label: "USB-C OTG Adapters", value: "usb-c-otg-adapters" },
					{ label: "Micro-USB OTG Adapters", value: "micro-usb-otg-adapters" },
					{
						label: "Multi-Port OTG Adapters",
						value: "multi-port-otg-adapters",
					},
				],
			},
			{
				label: "Card Readers",
				value: "card-readers",
				subcategories: [
					{ label: "USB-C Card Readers", value: "usb-c-card-readers" },
					{ label: "Micro-USB Card Readers", value: "micro-usb-card-readers" },
					{
						label: "Multi-Slot Card Readers",
						value: "multi-slot-card-readers",
					},
				],
			},
			{
				label: "USB Cables",
				value: "usb-cables",
				subcategories: [
					{ label: "USB-C to USB-C Cables", value: "usb-c-to-usb-c-cables" },
					{ label: "USB-C to USB-A Cables", value: "usb-c-to-usb-a-cables" },
					{
						label: "USB-C to Lightning Cables",
						value: "usb-c-to-lightning-cables",
					},
				],
			},
		],
	},
	{
		label: "Wearables",
		items: [
			{
				label: "Smart Watches",
				value: "smart-watches",
				subcategories: [
					{ label: "Fitness Trackers", value: "fitness-trackers" },
					{ label: "Luxury Smart Watches", value: "luxury-smart-watches" },
					{ label: "Rugged Smart Watches", value: "rugged-smart-watches" },
				],
			},
			{
				label: "Watch Straps",
				value: "watch-straps",
				subcategories: [
					{ label: "Silicone Straps", value: "silicone-straps" },
					{ label: "Leather Straps", value: "leather-straps" },
					{ label: "Metal Straps", value: "metal-straps" },
				],
			},
			{
				label: "Watch Chargers",
				value: "watch-chargers",
				subcategories: [
					{ label: "Magnetic Chargers", value: "magnetic-chargers" },
					{ label: "Wireless Chargers", value: "wireless-watch-chargers" },
					{ label: "Portable Chargers", value: "portable-watch-chargers" },
				],
			},
			{
				label: "Watch Screen Protectors",
				value: "watch-protectors",
				subcategories: [
					{
						label: "Tempered Glass Protectors",
						value: "tempered-glass-watch-protectors",
					},
					{
						label: "Plastic Film Protectors",
						value: "plastic-film-watch-protectors",
					},
					{
						label: "Anti-Scratch Protectors",
						value: "anti-scratch-watch-protectors",
					},
				],
			},
		],
	},
	{
		label: "Maintenance",
		items: [
			{
				label: "Cleaning Kits",
				value: "cleaning-kits",
				subcategories: [
					{ label: "Screen Cleaning Kits", value: "screen-cleaning-kits" },
					{ label: "Lens Cleaning Kits", value: "lens-cleaning-kits" },
					{ label: "Device Cleaning Kits", value: "device-cleaning-kits" },
				],
			},
			{
				label: "Repair Tools",
				value: "repair-tools",
				subcategories: [
					{ label: "Screwdriver Kits", value: "screwdriver-kits" },
					{ label: "Pry Tools", value: "pry-tools" },
					{ label: "Adhesive Strips", value: "adhesive-strips" },
				],
			},
			{
				label: "Replacement Parts",
				value: "replacement-parts",
				subcategories: [
					{ label: "Battery Replacements", value: "battery-replacements" },
					{ label: "Screen Replacements", value: "screen-replacements" },
					{
						label: "Charging Port Replacements",
						value: "charging-port-replacements",
					},
				],
			},
			{
				label: "Cleaning Solutions",
				value: "cleaning-solutions",
				subcategories: [
					{
						label: "Screen Cleaning Solutions",
						value: "screen-cleaning-solutions",
					},
					{
						label: "Lens Cleaning Solutions",
						value: "lens-cleaning-solutions",
					},
					{
						label: "Device Cleaning Solutions",
						value: "device-cleaning-solutions",
					},
				],
			},
		],
	},
];

export const tags = [
	{
		label: "Phone Cases",
		items: [
			{ label: "iPhone Cases", value: "iphone-cases" },
			{ label: "Galaxy Cases", value: "galaxy-cases" },
			{ label: "OnePlus Cases", value: "oneplus-cases" },
			{ label: "Pixel Cases", value: "pixel-cases" },
			{ label: "Clear Cases", value: "clear-cases" },
			{ label: "Leather Cases", value: "leather-cases" },
			{ label: "Rugged Cases", value: "rugged-cases" },
		],
	},
	{
		label: "Screen Protectors",
		items: [
			{ label: "Tempered Glass", value: "tempered-glass" },
			{
				label: "Privacy Screen Protectors",
				value: "privacy-screen-protectors",
			},
			{ label: "Anti-Glare Protectors", value: "anti-glare-protectors" },
			{ label: "Self-Healing Protectors", value: "self-healing-protectors" },
		],
	},
	{
		label: "Chargers & Cables",
		items: [
			{ label: "Fast Chargers", value: "fast-chargers" },
			{ label: "Wireless Chargers", value: "wireless-chargers" },
			{ label: "USB-C Cables", value: "usb-c-cables" },
			{ label: "Lightning Cables", value: "lightning-cables" },
			{ label: "Car Chargers", value: "car-chargers" },
			{ label: "Multi-Port Chargers", value: "multi-port-chargers" },
		],
	},
	{
		label: "Earphones & Headphones",
		items: [
			{ label: "AirPods", value: "airpods" },
			{ label: "Galaxy Buds", value: "galaxy-buds" },
			{ label: "Wireless Earbuds", value: "wireless-earbuds" },
			{
				label: "Noise-Cancelling Headphones",
				value: "noise-cancelling-headphones",
			},
			{ label: "Sports Earphones", value: "sports-earphones" },
		],
	},
	{
		label: "Power Banks",
		items: [
			{ label: "20,000mAh Power Banks", value: "20000mah-power-banks" },
			{ label: "10,000mAh Power Banks", value: "10000mah-power-banks" },
			{ label: "Slim Power Banks", value: "slim-power-banks" },
			{ label: "Solar Power Banks", value: "solar-power-banks" },
		],
	},
	{
		label: "Smartwatch Accessories",
		items: [
			{ label: "Apple Watch Bands", value: "apple-watch-bands" },
			{ label: "Galaxy Watch Bands", value: "galaxy-watch-bands" },
			{ label: "Charging Docks", value: "charging-docks" },
			{ label: "Screen Protectors", value: "smartwatch-screen-protectors" },
		],
	},
];

export const ColorData = [
	{
		id: 1,
		label: "Red",
		value: "#FF0000",
	},
	{
		id: 2,
		label: "Green",
		value: "#00FF00",
	},
	{
		id: 3,
		label: "Blue",
		value: "#0000FF",
	},
	{
		id: 4,
		label: "Yellow",
		value: "#FFFF00",
	},
	{
		id: 5,
		label: "Orange",
		value: "#FFA500",
	},
	{
		id: 6,
		label: "Purple",
		value: "#800080",
	},
	{
		id: 7,
		label: "Pink",
		value: "#FFC0CB",
	},
	{
		id: 8,
		label: "Cyan",
		value: "#00FFFF",
	},
	{
		id: 9,
		label: "Magenta",
		value: "#FF00FF",
	},
	{
		id: 10,
		label: "Lime",
		value: "#76f005",
	},
	{
		id: 11,
		label: "Teal",
		value: "#008080",
	},
	{
		id: 12,
		label: "Navy",
		value: "#000080",
	},
	{
		id: 13,
		label: "Maroon",
		value: "#800000",
	},
	{
		id: 14,
		label: "Olive",
		value: "#808000",
	},
	{
		id: 15,
		label: "Gray",
		value: "#808080",
	},
	{
		id: 16,
		label: "Silver",
		value: "#C0C0C0",
	},
	{
		id: 17,
		label: "Black",
		value: "#000000",
	},
	{
		id: 18,
		label: "White",
		value: "#FFFFFF",
	},
	{
		id: 19,
		label: "Coral",
		value: "#FF7F50",
	},
	{
		id: 20,
		label: "Gold",
		value: "#FFD700",
	},
	{
		id: 21,
		label: "Indigo",
		value: "#4B0082",
	},
	{
		id: 22,
		label: "Violet",
		value: "#EE82EE",
	},
	{
		id: 23,
		label: "Turquoise",
		value: "#40E0D0",
	},
	{
		id: 24,
		label: "Salmon",
		value: "#FA8072",
	},
	{
		id: 25,
		label: "Khaki",
		value: "#F0E68C",
	},
	{
		id: 26,
		label: "Beige",
		value: "#F5F5DC",
	},
	{
		id: 27,
		label: "Lavender",
		value: "#E6E6FA",
	},
	{
		id: 28,
		label: "Mint",
		value: "#B2FFB2",
	},
	{
		id: 29,
		label: "Peach",
		value: "#FFE5B4",
	},
	{
		id: 30,
		label: "Ruby",
		value: "#E0115F",
	},
	{
		id: 31,
		label: "Emerald",
		value: "#50C878",
	},
	{
		id: 32,
		label: "Sapphire",
		value: "#0F52BA",
	},
	{
		id: 33,
		label: "Amber",
		value: "#FFBF00",
	},
	{
		id: 34,
		label: "Charcoal",
		value: "#36454F",
	},
	{
		id: 35,
		label: "Ivory",
		value: "#FFFFF0",
	},
	{
		id: 36,
		label: "Bronze",
		value: "#CD7F32",
	},
	{
		id: 37,
		label: "Plum",
		value: "#8E4585",
	},
	{
		id: 38,
		label: "Sky Blue",
		value: "#87CEEB",
	},
	{
		id: 39,
		label: "Forest Green",
		value: "#228B22",
	},
	{
		id: 40,
		label: "Burgundy",
		value: "#800020",
	},
	{
		id: 41,
		label: "Mustard",
		value: "#FFDB58",
	},
	{
		id: 42,
		label: "Rose",
		value: "#FF007F",
	},
	{
		id: 43,
		label: "Slate",
		value: "#708090",
	},
	{
		id: 44,
		label: "Crimson",
		value: "#DC143C",
	},
	{
		id: 45,
		label: "Aquamarine",
		value: "#7FFFD4",
	},
	{
		id: 46,
		label: "Periwinkle",
		value: "#CCCCFF",
	},
	{
		id: 47,
		label: "Tangerine",
		value: "#F28500",
	},
	{
		id: 48,
		label: "Mauve",
		value: "#E0B0FF",
	},
	{
		id: 49,
		label: "Cerulean",
		value: "#007BA7",
	},
	{
		id: 50,
		label: "Cobalt",
		value: "#0047AB",
	},
	{
		id: 51,
		label: "Chartreuse",
		value: "#7FFF00",
	},
	{
		id: 52,
		label: "Honeydew",
		value: "#F0FFF0",
	},
	{
		id: 53,
		label: "Lilac",
		value: "#C8A2C8",
	},
	{
		id: 54,
		label: "Orchid",
		value: "#DA70D6",
	},
	{
		id: 55,
		label: "Sepia",
		value: "#704214",
	},
	{
		id: 56,
		label: "Tan",
		value: "#D2B48C",
	},
	{
		id: 57,
		label: "Wheat",
		value: "#F5DEB3",
	},
	{
		id: 58,
		label: "Azure",
		value: "#007FFF",
	},
	{
		id: 59,
		label: "Chocolate",
		value: "#7B3F00",
	},
];

export const CategoryContent = {
	"phone-cases": {
		title: "Phone Cases",
		description:
			"Discover our range of ergonomic, soft-touch cases crafted exclusively for your iPhone. The perfect balance of fashion and function. Available for iPhone 13, iPhone 14, and iPhone 15 Series. Optional with MagSafe.",
	},
	"airpod-cases": {
		title: "AirPods Cases",
		description:
			"Protect your AirPods in style with our premium protective cases. Designed for both AirPods and AirPods Pro, our cases offer the perfect blend of protection and aesthetics. Choose from a variety of materials, including silicone, leather, and rugged designs.",
	},
	"watch-straps": {
		title: "Watch Straps",
		description:
			"Elevate your smartwatch with our collection of premium watch bands. Compatible with all series of Apple Watch and Samsung Galaxy Watch, offering comfort and style for every occasion. Available in leather, metal, and silicone options.",
	},
	chargers: {
		title: "Chargers",
		description:
			"Keep your devices powered up with our high-quality chargers. From fast-charging wall adapters to portable car chargers, we have everything you need to stay connected on the go. Compatible with iPhone, Android, and other USB-C devices.",
	},
	powerbanks: {
		title: "Power Banks",
		description:
			"Never run out of battery with our reliable power banks. Compact, lightweight, and powerful, our power banks are perfect for travel, work, or everyday use. Featuring fast-charging technology and multiple ports for charging multiple devices simultaneously.",
	},
	"screen-protectors": {
		title: "Screen Protectors",
		description:
			"Protect your device's screen from scratches and cracks with our durable screen protectors. Made from tempered glass or high-quality film, our protectors offer crystal-clear clarity and touch sensitivity. Available for smartphones, tablets, and smartwatches.",
	},
	"camera-lenses": {
		title: "Camera Lenses",
		description:
			"Enhance your smartphone photography with our attachable camera lenses. From wide-angle to macro lenses, our collection allows you to capture stunning photos and videos with your phone. Compatible with most smartphone models.",
	},
	"selfie-sticks": {
		title: "Selfie Sticks",
		description:
			"Take the perfect selfie with our range of selfie sticks. Lightweight, extendable, and easy to use, our selfie sticks are perfect for capturing group photos, travel memories, and more. Compatible with all smartphones.",
	},
	"wireless-chargers": {
		title: "Wireless Chargers",
		description:
			"Simplify your charging experience with our wireless chargers. Sleek, fast, and convenient, our chargers are compatible with Qi-enabled devices, including iPhone, Samsung Galaxy, and AirPods. Choose from charging pads, stands, and multi-device stations.",
	},
	"cables-adapters": {
		title: "Cables & Adapters",
		description:
			"Stay connected with our durable cables and adapters. From USB-C to Lightning cables, we offer high-quality options for charging and syncing your devices. Perfect for home, office, or travel use.",
	},
	"headphones-earphones": {
		title: "Headphones & Earphones",
		description:
			"Immerse yourself in high-quality sound with our headphones and earphones. Whether you prefer over-ear, on-ear, or in-ear options, our collection offers superior audio performance and comfort for music, calls, and more.",
	},
	"smart-home-devices": {
		title: "Smart Home Devices",
		description:
			"Transform your home with our range of smart home devices. From smart plugs to voice-controlled assistants, our products make your home more efficient, secure, and connected. Compatible with Alexa, Google Assistant, and Apple HomeKit.",
	},
	"gaming-accessories": {
		title: "Gaming Accessories",
		description:
			"Enhance your gaming experience with our premium gaming accessories. From controllers to headsets, our products are designed for gamers who demand performance and comfort. Compatible with consoles, PCs, and mobile devices.",
	},
	"laptop-accessories": {
		title: "Laptop Accessories",
		description:
			"Boost your productivity with our laptop accessories. From ergonomic stands to portable keyboards, our collection is designed to make your work and play more comfortable and efficient. Compatible with MacBook, Windows, and Chromebook devices.",
	},
	"tablet-accessories": {
		title: "Tablet Accessories",
		description:
			"Maximize your tablet's potential with our range of accessories. From protective cases to stylus pens, our products are designed to enhance your tablet experience. Compatible with iPad, Samsung Galaxy Tab, and more.",
	},
};

export const SideCategoryModel = [
	{
		id: 1,
		title: "Phone Cases",
		aliases: ["phone-cases", "cases", "phone case", "case"],
	},
	{
		id: 2,
		title: "AirPods Cases",
		aliases: ["airpod-cases", "airpod", "airpods", "airpods-case"],
	},
	{
		id: 3,
		title: "Watch Straps",
		aliases: [
			"straps",
			"watch-straps",
			"watch strap",
			"watch straps",
			"iwatch-straps",
			"iwatch strap",
		],
	},
	{
		id: 4,
		title: "Chargers",
		aliases: [
			"chargers",
			"charger",
			"charging-cables",
			"charging cable",
			"usb-chargers",
			"usb charger",
		],
	},
	{
		id: 5,
		title: "Screen Protectors",
		aliases: [
			"screen-protectors",
			"screen protector",
			"tempered-glass",
			"glass protector",
		],
	},
	{
		id: 6,
		title: "Power Banks",
		aliases: ["power-banks", "power bank", "portable charger", "battery pack"],
	},
	{
		id: 7,
		title: "Adapters",
		aliases: ["adapters", "adapter", "dongles", "converters"],
	},
	{
		id: 8,
		title: "Phone Holders",
		aliases: ["phone-holders", "car mount", "phone stand", "phone grip"],
	},
	{
		id: 9,
		title: "Bluetooth Earphones",
		aliases: ["bluetooth-earphones", "wireless earphones", "earbuds"],
	},
	{
		id: 10,
		title: "Camera Accessories",
		aliases: ["camera-accessories", "lens protector", "camera lens"],
	},
	{
		id: 11,
		title: "Watch Protectors",
		aliases: ["watch-protectors", "watch screen protector", "iwatch protector"],
	},
	{
		id: 12,
		title: "Cleaning Kits",
		aliases: ["cleaning-kits", "cleaning kit", "phone cleaner"],
	},
];
