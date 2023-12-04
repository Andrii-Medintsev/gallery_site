# gallery_site (mini unsplash clone)

[DEMO LINK](https://gallery-site-d17d0y8gk-andriis-projects-15771f5f.vercel.app/)

Instruction to run app locally

1. Open bash/zsh terminal
2. In the terminal, navigate to the folder on your computer where you will clone the project.
3. Inside the folder run this command: `git clone https://github.com/Andrii-Medintsev/gallery_site.git`
4. To open the project in your code editor of choice run `code gallery_site`
5. Navigate to the project folder using this command: `cd gallery_site`
6. Inside the folder folder run `npm i`
7. ## !!! IMPORTANT !!!
   
   To make app work locally you shoud add evironment variable with access key to usplash api
    - first go to [unsplash](https://unsplash.com/documentation#public-authentication) and get your own access key
    - inside the root project folder create `.env` file and add environment variable with your access key like this: `ACCESS_KEY={your_access_key}`
9. Inside the same folder run `npm run dev`
10. In your preferred web browser, go to http://localhost:3000 to view how the app appears on the client side.
11. To terminate the running project in terminal, press Control+C (Ctrl+C on Windows).
