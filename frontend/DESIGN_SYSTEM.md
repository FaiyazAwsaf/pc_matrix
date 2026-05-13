# PC Parser Design System

## 🎨 Color Palette

### Primary Colors

#### Beige (Background & Warmth)
- **Beige-50:** `#faf8f3` - Lightest background
- **Beige-100:** `#f5f1ea` - Light background
- **Beige-200:** `#ede7dd` - Medium background
- **Beige-300:** `#e4dbd1` - Borders
- **Beige-400:** `#d9cdc2` - Hover states
- **Beige-500:** `#c9b8a8` - Muted text
- **Beige-600:** `#b39a8a` - Accents
- **Beige-700:** `#9d856d` - Strong text
- **Beige-800:** `#7a6956` - Dark text

#### Blue (Primary Accent)
- **Blue-50:** `#eff6ff` - Highlight background
- **Blue-100:** `#dbeafe` - Light background
- **Blue-200:** `#bfdbfe` - Light accent
- **Blue-300:** `#93c5fd` - Medium accent
- **Blue-400:** `#60a5fa` - Accent
- **Blue-500:** `#3b82f6` - Primary
- **Blue-600:** `#2563eb` - Primary hover
- **Blue-700:** `#1d4ed8` - Primary active
- **Blue-800:** `#1e40af` - Dark primary

### Accent Colors
- **Teal:** `#14b8a6` - Success/Premium
- **Orange:** `#f97316` - Warning/Hot
- **Red:** `#ef4444` - Danger/Error
- **Green:** `#22c55e` - Success/Positive

### Neutral Colors (Text & Backgrounds)
- **Neutral-50:** `#fafafa` - Very light background
- **Neutral-100:** `#f5f5f5` - Light background
- **Neutral-200:** `#e5e5e5` - Borders
- **Neutral-300:** `#d4d4d4` - Subtle borders
- **Neutral-400:** `#a3a3a3` - Muted text
- **Neutral-500:** `#737373` - Secondary text
- **Neutral-600:** `#525252` - Darker text
- **Neutral-700:** `#404040` - Strong text
- **Neutral-800:** `#262626` - Very dark text
- **Neutral-900:** `#171717` - Darkest text

---

## 🔘 Components

### Buttons

All buttons have sharp, modern styling with smooth transitions.

#### Primary Button
```vue
<Button variant="primary" size="md">
  <span>Click me</span>
</Button>
```
- Used for main actions
- Blue background with white text
- Sharp rounded corners (8px)
- Shadow on hover
- 12px padding vertical, 24px horizontal (md)

#### Secondary Button
```vue
<Button variant="secondary" size="md">
  Secondary Action
</Button>
```
- Used for alternative actions
- Beige background with dark text
- Good for less prominent CTAs

#### Outline Button
```vue
<Button variant="outline" size="md">
  Outline Action
</Button>
```
- Transparent background with blue border
- Used for tertiary actions

#### Ghost Button
```vue
<Button variant="ghost" size="md">
  Ghost Action
</Button>
```
- Minimal style, no border initially
- Great for navigation-like buttons

#### Danger Button
```vue
<Button variant="danger" size="md">
  Delete
</Button>
```
- Red background for destructive actions
- Requires confirmation

#### Success Button
```vue
<Button variant="success" size="md">
  Confirm
</Button>
```
- Green background for positive actions

#### Sizes
- **sm:** Small buttons for compact UI
- **md:** (Default) Standard buttons
- **lg:** Large buttons for primary CTAs

---

### Cards

Used for grouping related content with consistent styling.

#### Default Card
```vue
<Card>
  <h3>Card Title</h3>
  <p>Card content here</p>
</Card>
```
- White background
- Subtle shadow
- Light beige border
- Good for content blocks

#### Elevated Card
```vue
<Card variant="elevated">
  <h3>Featured Card</h3>
  <p>More prominent card</p>
</Card>
```
- Stronger shadow effect
- Better for featured content

#### Subtle Card
```vue
<Card variant="subtle">
  <h3>Light Card</h3>
  <p>Minimal background</p>
</Card>
```
- Beige background instead of white
- Good for secondary content

---

### Input Fields

Clean, modern input styling with clear focus states.

```vue
<Input
  v-model="email"
  type="email"
  label="Email Address"
  placeholder="you@example.com"
  required
  hint="We'll never share your email"
/>
```

#### Features
- Clear label with required indicator
- Beige border, transitions to blue on focus
- Helpful hint text below input
- Error state with red styling
- Smooth animations
- Two sizes: md (default) and lg

---

### Badges

Small labels for status, categories, or tags.

```vue
<Badge variant="blue">New</Badge>
<Badge variant="green">In Stock</Badge>
<Badge variant="red">Out of Stock</Badge>
<Badge variant="orange">On Sale</Badge>
<Badge variant="teal">Premium</Badge>
<Badge variant="beige">Default</Badge>
```

#### Variants
- **blue:** Primary status
- **green:** Success/positive
- **red:** Error/negative
- **orange:** Warning/attention
- **teal:** Premium/special
- **beige:** Default/neutral

---

### Alerts

Prominent notifications for important messages.

```vue
<Alert
  variant="info"
  title="Information"
  :closable="true"
  @close="handleClose"
>
  This is an informational message.
</Alert>

<Alert variant="success" title="Success">
  Operation completed successfully.
</Alert>

<Alert variant="warning" title="Warning">
  Please review this important notice.
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

#### Features
- Icon automatically shown based on variant
- Optional title
- Closable button
- Smooth animations
- Clear visual hierarchy

---

### Navigation Links

Consistent navigation styling throughout the app.

#### Desktop Nav Link
```vue
<NavLink to="/page" :active="isActive">
  Navigation Item
</NavLink>
```
- Blue text and background on active state
- Smooth hover effects
- Bottom border indicator for active state

#### Mobile Nav Link
```vue
<MobileNavLink to="/page" :active="isActive" @click="closeMobileMenu">
  Mobile Navigation Item
</MobileNavLink>
```
- Left border indicator for active state
- Better touch targets on mobile

---

## 📐 Spacing

All spacing follows an 8px base unit:
- **xs:** 4px (small gap)
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px
- **3xl:** 64px

Example: `space-x-4` = 16px horizontal gap

---

## 🔤 Typography

### Font Stack
- **Primary Font:** System fonts (Segoe UI, Helvetica, Arial)
- **Fallback:** Generic sans-serif

### Font Weights
- **Light (300):** Not commonly used
- **Regular (400):** Body text
- **Medium (500):** Secondary headings, labels
- **Semibold (600):** Navigation, buttons
- **Bold (700):** Headings

### Sizes
- **xs:** 12px - Small text, hints
- **sm:** 14px - Secondary text
- **base:** 16px - Body text
- **lg:** 18px - Subheadings
- **xl:** 20px - Small headings
- **2xl:** 24px - Headings
- **3xl:** 30px - Large headings
- **4xl:** 36px - Page titles

### Line Heights
- **tight:** 1.25 - Headings
- **snug:** 1.375 - Subheadings
- **normal:** 1.5 - Body text
- **relaxed:** 1.625 - Lists

---

## 🎭 Shadows

Creates depth and hierarchy with consistent shadowing.

- **shadow-sm:** Subtle shadow for cards
- **shadow-md:** (Default) Standard elevation
- **shadow-lg:** Prominent elevation for dropdowns
- **shadow-xl:** Maximum elevation for modals

Example: `shadow-lg hover:shadow-xl`

---

## 🔲 Rounded Corners

Sharp but not harsh design philosophy.

- **rounded-md:** 6px - Input fields
- **rounded-lg:** 8px - Buttons, cards
- **rounded-xl:** 12px - Large cards, modals
- **rounded-full:** For pills and circles

---

## 🎬 Animations & Transitions

All transitions are smooth and performant (200-300ms).

### Built-in Animations
- `animate-slideInDown` - Dropdown menus
- `animate-slideInUp` - Bottom sheets
- `animate-fadeInScale` - Modal opens
- `animate-shimmer` - Loading skeleton
- `smooth-transition` - Generic smooth changes

### Hover Effects
- Button shadow increases
- Text color transitions
- Background color changes
- Icon rotations (arrows, etc.)

---

## 📱 Responsive Design

### Breakpoints
- **sm:** 640px - Large phones
- **md:** 768px - Tablets
- **lg:** 1024px - Desktops
- **xl:** 1280px - Large desktops
- **2xl:** 1536px - Ultra-wide

### Mobile-First Approach
- Base styles optimized for mobile
- Use `md:` or `lg:` prefixes for larger screens

Example:
```html
<div class="hidden lg:flex items-center space-x-8">
  <!-- Desktop navigation -->
</div>

<button class="lg:hidden p-2">
  <!-- Mobile menu -->
</button>
```

---

## 🌗 Accessibility

### WCAG AA Compliance
- Minimum color contrast ratios met
- Focus states clearly visible
- All interactive elements keyboard accessible
- Semantic HTML used throughout

### Focus Ring
Use `.focus-ring` class for keyboard navigation:
```html
<button class="focus-ring">
  Keyboard Focus Visible
</button>
```

---

## 🎯 Usage Examples

### Complete Form
```vue
<div class="space-y-4">
  <h2 class="subsection-title">Sign Up</h2>
  
  <Input
    v-model="form.email"
    type="email"
    label="Email"
    placeholder="you@example.com"
    required
  />
  
  <Input
    v-model="form.password"
    type="password"
    label="Password"
    placeholder="••••••••"
    required
  />
  
  <Button variant="primary" size="lg" class="w-full">
    Create Account
  </Button>
</div>
```

### Content Section
```vue
<section class="py-16 bg-beige-50">
  <div class="container-main">
    <h2 class="section-title">Featured Products</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <Card v-for="product in products" :key="product.id" variant="elevated">
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg" />
        <h3 class="mt-4 font-bold text-lg">{{ product.name }}</h3>
        <p class="text-neutral-600 mt-2">{{ product.description }}</p>
        <div class="flex items-center justify-between mt-4">
          <Badge variant="green">In Stock</Badge>
          <Button variant="primary">
            View Details
          </Button>
        </div>
      </Card>
    </div>
  </div>
</section>
```

---

## 🚀 Implementation Tips

1. **Always use component wrappers** - Don't apply classes directly to elements
2. **Maintain color consistency** - Stick to the palette, don't create new shades
3. **Test on mobile** - Responsive design is essential
4. **Use semantic HTML** - Better accessibility and SEO
5. **Group related spacing** - Use consistent gaps within sections
6. **Animation restraint** - Don't over-animate; keep it professional
7. **Dark mode ready** - Components are built with extensibility in mind

---

**Last Updated:** May 2024
**Version:** 1.0.0
