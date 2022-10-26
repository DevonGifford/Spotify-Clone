<!-- Introduction Text -->
<div align="center">
    <h1>Spotify Clone</h1>
    <h4>(Portfolio Project)<h4>
    <h3> 🎯🎯🎯 - insert live-link here -  🎯🎯🎯 </h3>
        <h6>
            built with <a href="https://nextjs.org">Next.js</a> &
            hosted by <a href="https://vercel.com/">Vercel</a> 
        </h6>
</div>

<!-- Logo -->
<p align='center'>
    <img src="public/assets/.github/SpotifyClone.webp" alt="Demo" title="DemoImage" width="500" height="300">
</p>


<!-- Tech Used in this Project
<p align='center'>
    <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=ts,tailwind,nextjs,vercel,github,vscode" />
    </a>
</p>
<hr> -->







<!-- -------------------------------------------------------------------------- -->

<h1 align='center'> Welcome & Introductory </h1>

<!-- -------------------------------------------------------------------------- -->



### Brief Introduction:
<!-- -------------------------------------------------------------------------- -->
<hr/>



<!-- Welcome to my Ecommerce Project Repository, a portfolio project of mine!

This project serves as a personal learning experience, allowing me to test my abilities in seeing a project through from start to finish. Rather than replicating existing stores, the focus is on developing robust business logic and integrating various technologies.

My goal was to fully immerse myself in building an ecommerce application, exploring different topics and honing my implementation and integration skills. While efficiency could have been prioritized, the main objective was to gain comprehensive knowledge. -->
<br><br><br/>












### Key Features of this project:
<!-- -------------------------------------------------------------------------- -->
<hr>

<br>


<!-- Small container -->
<details>
<summary> Click here to see all the goals: </summary>
<br/>


<div>
    <ul>
        <li> Song upload
        <li> Stripe integration
        <li> Tailwind design for sleek UI
        <li> Tailwind animations and transition effects
        <li> Full responsiveness for all devices
        <li> Credential authentication with Supabase
        <li> Github authentication integration
        <li> File and image upload using Supabase storage
        <li> Client form validation and handling using react-hook-form
        <li> Server error handling with react-toast
        <li> Play song audio
        <li> Favorites system
        <li> Playlists / Liked songs system
        <li> Advanced Player component
        <li> Stripe recurring payment integration
        <li> Using POST, GET, and DELETE routes in route handlers (app/api)
        <li> Fetch data with server React components by directly accessing the database (without api)
        <li> Handling relations between Server and Child components in a real-time environment
        <li> Cancelling Stripe subscriptions
    </ul> 
</div>

<!-- CLOSING DIV -->
</details>
<br/><br/><br/>









### Important points to note:
<!-- -------------------------------------------------------------------------- -->
<hr>



<!-- <li> The project places less emphasis on creating visually stunning designs. Instead, it prioritizes building and refining business logic, implementing functionality, and exploring diverse technologies.
<br><br>
<li> The user interface and design maintain a minimalistic and functional approach, allowing a greater focus on learning and development.
<br><br>
<li> This project doesn't aim to create a real store with actual products. Instead, the focus is on building business logic and refining development skills, simulating real-world scenarios and mirroring professional work environments.
<br><br>
You can see all tickets created & closed here  :   <a href="https://github.com/DevonGifford/Ecommerce_Showcase/issues?q=is%3Aissue+is%3Aclosed">Closed Tickets ✅</a> -->

<br><br/>















### Demo Image
<!-- -------------------------------------------------------------------------- -->
<hr>

<!-- Demo Image 🎯🎯🎯 -->
<!-- <p align='center'>
    <img src="public/assets/PortfolioDemoDevon.png" alt="Demo" title="DemoImage" width="650" height="650">
</p> -->

<br><br><br>











<!-- -------------------------------------------------------------------------- -->

<h1 align='center'> Development Journey</h1>

<!-- -------------------------------------------------------------------------- -->

In this section, I'll guide you through the step-by-step process of bringing this project to life. From initial concept to final implementation, I've documented my progress, highlighting the tools, technologies, and methodologies used along the way.

Please note that this project was primarily a learning experience. While there may have been more efficient approaches, I intentionally explored specific topics and tested my abilities with various technologies and libraries.

Join me on this behind-the-scenes adventure as I share exciting milestones, challenges, and valuable lessons learned as a solo developer. Experience the transformation of an idea into a fully functional ecommerce platform.
<br>
<hr>

<!-- -------------------------------------------------------------------------- -->
<!-- DEV JOURNEY CONTAINER OPEN -->
<details>
<summary>  Click here to expand and see all the steps I took to build this project: </summary>
<br/><br/>

<!-- -------------------------------------------------------------------------- -->


## NO. TEMPLATE
<!-- -------------------------------------------------------------------------- -->
<hr>
<!-- SECTION container open -->
<details>
<summary> Click here to expand: </summary>
<br>

test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test 

<!-- SECTION container closed -->
</details>
<br/><br/>
<!-- -------------------------------------------------------------------------- -->

## 1. PROJECT SETUP & SCAFFOLDING
<!-- -------------------------------------------------------------------------- -->
<hr>
<!-- SECTION container open -->
<details>
<summary> Click here to expand: </summary>
<br>

### PROJECT SETUP
<hr/>

<details>
<summary> Click here to expand: </summary>
<br/><br/>


#### Git Repository Setup
- Created a new Git repository to track project changes.

#### Next.js Project Setup
- Set up a new Next.js project to build the Spotify clone.
- Initialized the project with necessary dependencies and scripts.

##### Boilerplate Code Removal
- Removed unnecessary boilerplate code generated by Next.js.

##### Troubleshooting Errors
- Troubleshooted and resolved errors related to missing modules:

    ```
    ❌Error:
    'next' is not recognized as an internal or external command

    🤔Cause:
    Next.js package is not installed globally or is not accessible from the current working directory.
    
    ✅SOLUTION:
    npm install next
    ```
  
    ```
    ❌Error: 
    Cannot find module 'autoprefixer'
    
    🤔Cause:  
    not accessible from the current working directory.

    ✅SOLUTION:
    npm install autoprefixer
    ```

    ```
    ❌Error: Cannot find module 'tailwindcss'

    🤔Cause:  
    dependency is not installed
    
    ✅SOLUTION:
    npm install tailwindcss
    
    Verify package is in package.json
    npm install autoprefixer --save

    ```

<!--  container closed -->
</details>
<br/>


### Project Design and Styling
<hr/>

<details>
<summary> Click here to expand: </summary>
<br/><br/>


#### Mobile-First Mindset
- Decided to develop the Spotify clone with a mobile-first approach to ensure optimal user experience across devices.

##### Spotify Home Page Analysis
- Analyzed the layout and design of the Spotify home page on both desktop and mobile views.
- Identified key components and visual elements to replicate in the clone.

##### Global CSS Setup
- Created a `globals.css` file to define global styles and replicate Spotify colors and fonts.

##### General Overlay Setup
- Updated the `layout.tsx` file to include a general overlay structure.
- Created a Sidebar component to be visible only on larger screens.
- Utilized the `tailwind-merge` library to achieve custom styling for the sidebar.
- Implemented the main content section with a dynamic sidebar and library component.

<!--  container closed -->
</details>
<br/>

### Code and Libraries
<hr/>

<details>
<summary> Click here to expand: </summary>
<br/><br/>


##### Technologies Used
- Utilized functional components for development.
- Leveraged `next/link` for client-side navigation.
- Employed `next/navigation` package for hooks like `usePathname` and `useRouter`.
- Utilized React library features such as `forwardRef` and `useMemo`.

##### Server and Client Components
- Implemented a mix of server-side and client-side components.
- Used `use client;` to differentiate between server and client rendering.

<!--  container closed -->
</details>
<br/><br/>


### Different Components created
<hr>
<!-- container open -->

If you want a brief description of the different components I have created and what they do ...

<details>
<summary> Click here to expand: </summary>
<br/><br/>

#### layout.tsx File

The `layout.tsx` file defines the root layout for the Spotify clone project. 
It imports the Google Fonts library (`next/font/google`) to set the font for the entire application. 
The `globals.css` file is also imported to apply global styles.

The `RootLayout` component is the main layout wrapper, which sets the document language to English (`en`). It applies the imported font class to the `body` element. The `Sidebar` component is rendered as a sidebar navigation container, and the `children` components are passed as its content.

This layout structure ensures consistent styling and provides a common structure for all pages in the Spotify clone project.

<br/>

#### page.tsx File

The `page.tsx` file represents the main page of the Spotify clone. It includes the `Header` component, which displays a welcome message and a list of recently liked songs. The file also contains a section for displaying the newest songs, which is currently commented out and not implemented.

<br/>

#### Sidebar Component

The `Sidebar` component renders the sidebar section of the Spotify clone, displaying navigation items and a library section. It provides easy navigation and access to the library for a seamless user experience.
<br/>

#### SidebarItem Component

The `SidebarItem` component represents an individual navigation item in the sidebar. It displays an icon and label, and provides a clickable link to navigate to a specific page. It also highlights the active item based on the current URL.
<br/>

#### Box Component

The `Box` component is a wrapper that provides a styled container for its children. It applies a background color, rounded corners, and adjusts its height to fit the content. Additional custom styling can be applied by providing a `className` prop.
<br/>

#### Button Component

The `Button` component renders a styled button element. It has various features such as customizable styles, support for different button types, and handling of disabled state. The button can be used for triggering actions or submitting forms.
<br/>

#### Header Component

The `Header` component represents the header section of the Spotify clone. It includes buttons for navigating back and forward, a home button, a search button, and login/sign-up buttons. The component adapts its rendering based on the screen size to provide a responsive user experience.
<br/>

#### ListItem Component

The `ListItem` component represents an individual item in the liked songs section of the Spotify clone. It displays an image, the name of the song, and a play button. Clicking on the component triggers a navigation to the specified `href`. The component also includes handling for user authentication in future updates.
<br/>

#### Library Component

The `Library` component represents the user's library in the Spotify clone. It displays a heading "Your Library" with a playlist icon. The component also includes a "plus" icon for adding new songs to the library. The list of songs will be dynamically rendered in the commented section that is currently not implemented.


<!--  container closed -->
</details>
<br/>

### Conclusion
<hr/>

 I've been making great progress with the project setup, design, and code implementation. 🚀 <br>
 I set up Git like a pro and got Next.js fired up with all the necessary dependencies. 💪

I've been all about that <strong>mobile-first mindset</strong>, diving deep into the Spotify home page vibes to gather inspiration. 🎧 <br>
Identifying those key components and design elements to replicate has been a game-changer, keeping things smooth and steady. 🎯

<strong>Styling and design?</strong> <br>Already on another level! I've unleashed my creativity with global CSS styles to match Spotify's sleek aesthetics. And those reusable components? They're like secret weapons, making the code look sharp and clean. 🔥

<strong>One major lesson I've learned?</strong> <br>Mastering the art of server-side and client-side components. I've been blending them seamlessly, getting the best of both worlds. 🌐

Now that I've built this solid foundation, the Spotify clone project is ready to soar to new heights. 🚀 

That's a wrap on the initial phase of my developer journal for the Spotify clone project. Stay tuned for more exciting updates as I continue on this music streaming adventure. You don't want to miss it! ✌🔥

<em>🎵 EDM beats fades away into the distance...
</em>







<!-- SECTION container closed -->
</details>
<br/><br/>
<!-- -------------------------------------------------------------------------- -->




<!-- -------------------------------------------------------------------------- -->
<!-- DEV JOURNEY CONTAINER CLOSED -->
</details>
<!-- -------------------------------------------------------------------------- -->

<br/><br/><br/><br/>
















### 🍴🔱 Forking this repo 🍴🔱
---------------------------------------------------

<!-- SECTION container open -->
<details>
<summary> Click here to see more: </summary>
<br>
    Yes, you are welcome to fork this repo. <br>
    However, please give all proper credit by linking back to me
    <br>
    <h5> You could also give me a star if you like this project 😉⭐ </h5> 
<!-- CLOSED -->
</details>
<br/><br/>




### 🏃‍♂️💨 Running this project locally 🏃‍♂️💨
---------------------------------------------------

<!-- SECTION container open -->
<details>
<summary> Click here to see more: </summary>
<br>

System Requirements:
<ul>
<li>Node.js 16.8 or later.
<li>macOS, Windows (including WSL), and Linux are supported.
</ul>
<br>

First, Install dependencies
```bash
npm install
```
<br>

Second, setup .env file


```js
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

<br>

Third, add SQL Tables
<br>
Use `database.sql` file, create songs and liked_songs table 

<br>

Then, run the development server:

```bash
npm run dev
```
<br>

Finally, Open up <code>localhost:3000</code> to view your application. <br>
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<ul>
<li>You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

<!-- <li>[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

<li>The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

<li>This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font. -->

</ul>

<!-- CLOSED -->
</details>
<br/><br/>




### 👷‍♂️🏗 Deploying on Vercel 👷‍♂️🏗 
---------------------------------------------------

<!-- SECTION container open -->
<details>
<summary> Click here to see more: </summary>
<br>

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
<br>
<br>
<br>

<!-- DEV JOURNEY CONTAINER CLOSED -->
</details>
<br/><br/>





<h2 align='center'>📃🖋 MIT LICENSE 📃🖋</h2>
<!-- ------------------------------------------------------------------ -->

<p align='center'>
Copyright 2023 - Devon Gifford
</p>
<p align='center'>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
</p>
<p align='center'>
THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</p>