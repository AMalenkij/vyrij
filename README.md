# 🎵 Vyrij Choir — Official Website


> **"Humans can't fly… Yet they have wings!"**  
> — Lina Kostenko

Official website of the Ukrainian choir "Vyrij" in Gdańsk, Poland.

---

## 📖 About the Project

### History

In 2019, Hanna Malenka (then Tekucheva) announced auditions for a Ukrainian choir in Gdańsk. The idea had been developing for years, but the final push came from Hama GAK.

### Choir Concept

The "Vyrij" choir was envisioned as:

- ✅ **An integration space** for migrants
- ✅ **A community** united through music
- ✅ **A mixed ensemble** (soprano, alto, tenor, bass) to showcase the richness of Ukrainian songs

### First Steps

The initial auditions attracted mostly:
- Ukrainians born in Poland
- People eager to preserve their heritage

Despite the shortage of male voices (a common challenge in amateur choirs), the group remains open to new members!

---

## 🚀 Technology Stack

### Core Technologies

- **[Next.js 16](https://nextjs.org/)** — React framework with SSR and SSG support
- **[React 19](https://react.dev/)** — library for building user interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** — typed JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** — utility-first CSS framework

### CMS and Data

- **[Sanity](https://www.sanity.io/)** — headless CMS for content management
- **[next-sanity](https://github.com/sanity-io/next-sanity)** — Sanity integration with Next.js
- **[GROQ](https://www.sanity.io/docs/groq)** — query language for Sanity

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** — accessible UI primitives
  - Dialog, Accordion, Checkbox, Dropdown Menu
- **[Lucide React](https://lucide.dev/)** — icons
- **[Motion](https://motion.dev/)** — animations (Framer Motion)
- **[Yet Another React Lightbox](https://yet-another-react-lightbox.com/)** — image gallery

### Internationalization

- **[next-intl](https://next-intl-docs.vercel.app/)** — multi-language support (UA, EN, PL)

### Development Tools

- **[Biome](https://biomejs.dev/)** — code linter and formatter
- **[PostCSS](https://postcss.org/)** — CSS processing

---

## 📂 Project Structure

```
vyrij/
├── app/                    # Next.js App Router
│   └── [locale]/          # Multi-language pages
├── components/            # React components
├── sanity/               # Sanity CMS configuration
│   └── schemaTypes/      # Data schemas
├── adapters/             # Data transformation adapters
├── constants/            # Application constants
├── formatters/           # Formatting utilities
├── i18n/                 # Internationalization config
├── lib/                  # Helper libraries
├── messages/             # Translations (ua, en, pl)
├── providers/            # React providers
├── public/               # Static files
└── types/                # TypeScript types
```

---

## 🗄️ Data Structure (Sanity CMS)

### Event (Events)

```typescript
Event {
  eventTitle: localeString      // Event title (ua, en, pl)
  slug: slug                     // URL-friendly identifier
  eventDescription: localeBlockContent  // Description with formatting
  date: date                     // Event date
  time: string                   // Time (HH:mm)
  location: reference → Location // Venue
  media: array<reference → Media> // Photos and videos
  tags: array<reference → Tag>   // Categories
}
```

### Tag (Tags)

```typescript
Tag {
  name: string  // Tag name (concert, rehearsal, recording, etc.)
}
```

### Location (Locations)

```typescript
Location {
  place: string    // Venue name
  address: string  // Full address
}
```

### Media (Media)

```typescript
Media {
  title: string                    // File name
  type: 'photo' | 'video' | 'url' // Media type
  imageFile?: image                // Image file (for photo)
  videoFile?: file                 // Video file (for video)
  videoUrl?: url                   // YouTube/Vimeo (for video)
  externalUrl?: url                // External link (for url)
}
```

### Entity Relationships

- `Event` is connected to:
  - many `Tag` (many-to-many)
  - one `Location` (many-to-one)
  - multiple `Media` (many-to-many)
- All relationships are implemented via `reference` in Sanity


## 🌍 Multi-language Support

The site supports three languages:

- 🇺🇦 **Ukrainian** (ua) — primary language
- 🇬🇧 **English** (en)
- 🇵🇱 **Polish** (pl)

Translations are located in the `messages/` folder:
- `messages/ua.json`
- `messages/en.json`
- `messages/pl.json`
---

## 🎨 Design Features

- **Responsive Design** — optimized for all devices
- **Dark Theme** — support via `next-themes`
- **Smooth Animations** — using Motion (Framer Motion)
- **Image Optimization** — automatic optimization via Next.js Image
- **Gallery** — interactive gallery with lightbox
- **Carousel** — smooth event carousel
---

## 🚢 Deployment

The project is optimized for deployment on **[Vercel](https://vercel.com/)**:

1. Connect the repository to Vercel
2. Add environment variables
3. Vercel will automatically build and deploy the project

## 📝 License

This project is private and belongs to the "Vyrij" choir.

---

## 🙏 Acknowledgments

Special thanks to:
- **Hama GAK** — for inspiration and support
- All members of the "Vyrij" choir
- The Ukrainian community in Gdańsk

---

<div align="center">

**Made with ❤️ to preserve Ukrainian culture**

</div>
