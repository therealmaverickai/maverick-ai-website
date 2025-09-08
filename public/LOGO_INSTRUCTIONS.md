# Logo and Favicon Setup Instructions

## Current Status
✅ **Favicon**: Set up with placeholder favicon (blue icon with "M" shape)
✅ **Logo**: Set up with placeholder SVG logo in header
✅ **Manifest**: Web app manifest created for PWA support

## How to Replace with Your Actual Logo

### 1. Replace the Header Logo
- Replace `/public/logo.svg` with your actual logo file
- Recommended formats: SVG (preferred), PNG, or JPG
- Recommended size: 120x40px (width x height) or maintain aspect ratio
- If using PNG/JPG, update the Header component to use `.png` or `.jpg` extension

### 2. Replace Favicon Files
Replace these files in `/public/` directory:
- `favicon.ico` - 32x32px ICO format
- `favicon.svg` - SVG format (scalable)
- `apple-touch-icon.png` - 180x180px PNG for iOS devices

### 3. Update Logo in Header Component
If your logo has different dimensions, update `/components/Header.tsx`:
```tsx
<Image
  src="/your-logo.png" // Change extension if needed
  alt="Maverick AI"
  width={YOUR_WIDTH}  // Update width
  height={YOUR_HEIGHT} // Update height
  priority
  className="h-10 w-auto" // Adjust height class if needed
/>
```

### 4. Update Manifest Colors
In `/public/manifest.json`, update the colors to match your brand:
```json
{
  "background_color": "#ffffff", // Your background color
  "theme_color": "#2B65F0"      // Your brand primary color
}
```

## Files Created in Test Environment
- `/public/favicon.ico` - Main favicon
- `/public/favicon.svg` - SVG favicon
- `/public/apple-touch-icon.png` - Apple touch icon
- `/public/logo.svg` - Header logo
- `/public/manifest.json` - Web app manifest
- Updated `/app/layout.tsx` - Added favicon metadata
- Updated `/components/Header.tsx` - Added logo image

## Testing
The test environment is running on: http://localhost:3002
You can see the favicon in the browser tab and the logo in the header.