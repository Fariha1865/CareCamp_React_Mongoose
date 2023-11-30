# CareCamp || Empowering Healthier Futures, One Camp at a Time

# Site-Link: https://hoscamp.netlify.app/

This is a Medical Camp management Website, made using React JS, CSS3 (Flowbite and Tailwind),Firebase Authentication, JWT authentication and MongoDB + Mongoose

# Material UI for Contact , Sign in and Registration pages and Mongoose for Userdata, all camps and upcoming camps routes


### Libraries Used:

- Material UI for Contact , Sign in and Registration pages
- Flowbite UI component library (All over website)
- Framer Motion (For animation in recent blogs and Newsletter sections in Home page)
- React-Fast Marque (Combined with framer motion to give animation effect when an element is in viewpoint of the user in home page)
- react-table-library (For the data table in Featured List page) (customly styled and Seachbar included)

### Used  tenstack query and axiosSecure for data fetching

### Website pages:

- Home page 
- All Available Camps Page
- Contact Us page
- All Blogs page
- Individual Dashboard pages for 3 different types of user roles (Organizer, Participant, Healthcare Professionals)

## Features:

- In home page, user can see a Slider, Camps Categories, Popular Camps based on maximum Participants registration , Upcoming camps, Subscrie section and Testimonials
- Users can create account with 3 types of Roles (Organizer, Participant, Healthcare Professionals))
- Organisers  can add new camps and upcoming camps, can manage participants confirmation and cancellation of his own createdcamps, Can manage and view nterested profesionals and participents in the upcoming camps and can accept them, can publish any upcoming event if joined participants count for that camps is greaer or equal to 5 and professionals count equal or greater than 2
- Participants can Join/Register for the popular, upcoming and othercamps and view details in manage registered data table in dashboard can make pament for any camp or cancel registration, can add testimonial for any attended camp andalso can see his payment history
- Professionals can show interest for any upcoming camps and see the upcoming camps in which he s acceptedby organizer in te Dashboard
- All the 3 types of users can viewand edit their profiles
- User can toggle between sign in and register pages
- While logging in, if credentials are not valid, error toast is shown and on valid credetials, success toast is shown
- While registering, if invalid email or password is entered, error toast is given. Password requirs minimum 6 characters and at least one capital and small letter, one digit and one special character
- After user is successfully signed in or registered, users photo and username is shown in navbar and logout button appears in dropdown
- When logout is clicked, user loggs out successfully and photo and username gets hidden and login/register button re-appears
- When a private route is reloaded, it keeps user in that page and doesn't navigate again to login page until user logs out
- When invalid url is types, user navigates to customized error page
- Website is made responsive for Tab and mobile devices

## Required:
- Tech Stack: Vite, CSS3 (Tailwind and DaisyUI)
- Programming Language: React,JavaScript
- User Authentication: Firebase, JWT token
- Database: MongoDB, Mongoose
- Code Editor: Visual Studio Code (VSCode)
- Terminal: Git Bash
