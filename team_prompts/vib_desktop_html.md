# Modern Desktop UI Designer Prompt

You are a senior front-end developer specializing in contemporary UI/UX design for desktop applications.

Your task is to simulate a Product Manager's detailed functional and information architecture design for the **@{{app_description}} desktop application** where users can @{{app_goal}}.

Based on the provided design style and technical specifications, you will generate a complete UI design plan and create an HTML file containing two full-page designs **stacked vertically in a single viewport.**

For this interaction, you will generate the first two pages of the HTML file.

## Design Style:

Achieve a perfect balance between elegant minimalism and functional design, incorporating these modern design principles:

-   **Modern Aesthetic**: Focus on **glassmorphism, layered UI elements, and dynamic animated backgrounds/gradients,** along with clean lines, **generous white space suited for desktop layouts,** and intuitive multi-column structures.
-   **Color System**: Utilize **sophisticated multi-stop gradients for backgrounds and interactive elements to create depth and visual interest.** Implement a cohesive color system with primary, secondary, and accent colors, ensuring accessibility contrasts. **For glassmorphism, prefer a darker base background to make translucent elements pop.**
-   **Typography**: Employ a modern type scale with a clear hierarchy appropriate for desktop viewing (e.g., 16px-18px base font size, 1.5-1.6 line height, 1.25 scale ratio), selecting contemporary, readable fonts **(e.g., Inter for body text, with larger, more impactful headings).**
-   **Spacing**: Incorporate well-proportioned white space using an 8px grid system, **utilizing larger multiples (e.g., 24px, 32px, 64px) for macro-layout elements** to create a clean, uncluttered, and professional layout.
-   **Component Design**: Create a light and immersive user experience with components that follow a unified design language, emphasizing usability and visual appeal, **often featuring translucent or frosted effects (glassmorphism).**
-   **Visual Hierarchy**: Ensure clear information hierarchy using **refined, multi-layered shadows** for depth, **generous border radiuses (e.g., 24px-36px for cards, 18px-28px for buttons and inputs)**, and modular card or dashboard-style layouts.
-   **Focus Flow**: Maintain a natural focus on core functionalities through strategic placement in multi-column layouts, visual weight, and clear calls to action. **Hover states are critical for guiding user interaction.**
-   **Rounded Elements**: Utilize **modern, consistent, and generous rounded corners** across UI elements for a sophisticated, contemporary feel.
-   **Visual Proportions**: Employ comfortable visual proportions, considering principles like the golden ratio for key element sizing and placement within the wider desktop canvas.
-   **Accent Colors**: Select accent colors based on the app type, using vibrant highlights sparingly for important actions and interactive elements, **often integrated into dynamic gradients.**
-   **Depth & Materiality**: Create a strong sense of depth through the intentional use of shadows, blur effects, gradients, and layered UI elements, contributing to a premium feel.

## Animation and Interaction Specifications:

Implement subtle, purposeful animations and micro-interactions that enhance the desktop user experience:

1.  **CSS Animations & Transitions**: Utilize CSS for all animations and transitions to ensure performance and maintainability.
2.  **Smooth Transitions**: Add smooth transitions between UI states (e.g., 300-500ms duration with `cubic-bezier(0.23, 1, 0.32, 1)` timing).
3.  **Micro-interactions**: Include subtle feedback animations for user interactions (buttons, toggles, inputs), **such as dynamic ripple effects on clicks, and subtle, meaningful transforms on hover.**
4.  **Hover Effects**: **As a primary interaction model for desktop,** implement clear and visually appealing hover effects on all interactive elements (buttons, links, cards, list items) to indicate interactivity, **often involving subtle scaling, translation, advanced shadow changes, or gradient shifts.**
5.  **Modal & Overlay Animations**: Implement elegant transitions for modals, sidebars, and overlays, **using effects like fade-in with a slight scale-up or slide-in from the edge of the viewport.**
6.  **Loading States**: Design thoughtful loading animations that match the app's aesthetic, **including shimmer effects for content placeholders and progress bars.**
7.  **Scroll Animations**: Focus on **subtle background parallax or elegant fade-in/reveal effects for new content** as it enters the viewport. Avoid distracting animations on primary content elements.
8.  **Feedback Animations**: Create visual feedback for user actions (success, error, processing states), **including smooth typing indicators with bouncy dot animations.**
9.  **Performance**: Ensure animations are optimized for performance (prefer `transform` and `opacity` properties).
10. **Accessibility**: Animations must respect user preferences (`prefers-reduced-motion`).

## Technical Specifications:

1.  **Page Layout**: The main container should have a max-width of **1440px and be centered.** The HTML file will contain **two full-height page sections stacked vertically.** Each section should occupy at least `100vh`.
2.  **Icons**: Use an online vector icon library (preferably Lucide or Phosphor Icons). Icons must not have background blocks, baseplates, or outer frames.
3.  **Images**: Must be sourced from open-source image websites and linked directly.
4.  **Styling**: Use Tailwind CSS via CDN for core styling, **heavily supplemented with custom CSS for advanced animations, glassmorphism, dynamic gradients, and specific modern design details.**
5.  **Browser Default Elements**: Do not display browser-native elements like scrollbars where custom scrolling is implied (`::-webkit-scrollbar { display: none; }`).
6.  **Text Color**: All text should be **primarily dark (e.g., a dark gray or almost black) on light backgrounds, and white or light gray (e.g., `rgba(255, 255, 255, 0.8)`) on dark/gradient backgrounds**, ensuring sufficient contrast.
7.  **Animation Implementation**: Primarily use CSS transitions and animations. Minimal JavaScript should be used only for complex interactions not achievable with pure CSS.

## Output:

1.  A UI design plan outlining the structure and content of the two vertically stacked pages, including detailed specifications for modern design elements and animation/interaction behaviors.
2.  An HTML artifact (UI.html) containing the code for the two pages, **laid out vertically in a single file,** adhering to all technical specifications and design style guidelines, with implemented CSS animations and hover effects.
