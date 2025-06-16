[//]: # 'URL SHORTER MICROSERVICE'

# <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&duration=1&pause=1&color=EB008B&center=true&vCenter=true&repeat=false&width=105&height=28&lines=quillink" alt="quillink" />

[//]: # '<!-- GitHub actions badges start -->'
[//]: # '<div>'
[//]: # '    <img loading="lazy" alt="Continuous Integration" src="https://github.com/montasim/quillink/actions/workflows/ci.yml/badge.svg?labelColor=EB008B&color=00B8B5">'
[//]: # '    <img loading="lazy" alt="Build on Merge" src="https://github.com/montasim/quillink/actions/workflows/build-on-merge.yml/badge.svg?labelColor=EB008B&color=00B8B5">'
[//]: # '    <img loading="lazy" alt="Automated Release Workflow for PR Merges" src="https://github.com/montasim/quillink/actions/workflows/create-release.yml/badge.svg?labelColor=EB008B&color=00B8B5">'
[//]: # '</div>'
[//]: # '<!-- GitHub actions badges end -->'

<!-- repository summary badges start -->
<div>
    <img alt="Wakatime coding time badge" src="https://wakatime.com/badge/user/bb224c90-7cb7-4c45-953e-a9e26c1cb06c/project/018e21fa-6cc2-477a-be0c-b5e44ca67f1c.svg?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub release" src="https://img.shields.io/github/release/montasim/quillink?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/montasim/quillink?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/w/montasim/quillink?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/montasim/quillink?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo file count" src="https://img.shields.io/github/directory-file-count/montasim/quillink?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/montasim/quillink?labelColor=EB008B&color=00B8B5">
    <img alt="GitHub license" src="https://img.shields.io/github/license/montasim/quillink?labelColor=EB008B&color=00B8B5">
</div>
<!-- repository summary badges end -->

<br/>

[//]: # 'CONTENTS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=120&height=24&lines=CONTENTS:" alt="CONTENTS:" />

1. [FEATURES](#1-features)
2. [PREREQUISITES](#2-prerequisites)
3. [SETUP](#3-setup)
4. [RUNNING THE SCRIPT](#4-running-the-script)
5. [ERROR HANDLING](#5-error-handling)
6. [HOSTING](#6-hosting)
7. [USED PACKAGES](#7-used-packages)
8. [TOOLS](#8-tools)
9. [ARTICLES](#9-articles)
10. [DO NOT FORGET TO DO](#10-do-not-forget-to-do)
11. [TUTORIALS](#11-tutorials)
12. [INSPIRATIONS](#12-inspirations)
13. [CONTRIBUTE](#13-contribute)
14. [CONTRIBUTORS](#14-contributors)
15. [SPECIAL THANKS](#15-special-thanks)
16. [LICENSE](#16-license)
17. [CONTACT](#17-contact)

<br/>

[//]: # '1. FEATURES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=120&height=24&lines=1.+FEATURES" alt="1. FEATURES" id="1-features" />

1. Create short URL
2. Redirect to the original URL
3. QR code
4. URL Analytics

<br/>

[//]: # '2. PREREQUISITES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=168&height=24&lines=2.+PREREQUISITES" alt="2. PREREQUISITES" id="2-prerequisites" />

1. Node v18
2. PNPM v10

<br/>

[//]: # '3. SETUP'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=80&height=24&lines=3.+SETUP" alt="3. SETUP" id="3-setup" />

1. **Clone the repository and navigate to the directory:**

    ```bash
    git clone https://github.com/montasim/quillink.git
    cd quillink
    ```

2. **Install the dependencies:**

    ```bash
    pnpm install
    ```

3. **Configuring the Environment:**

    Create a `.env.development` or `.env.staging` or `.env.production` file in the root directory of the project and populate it with the necessary environment variables. See the [.env.example](.env.example) file for an example.

<br/>

[//]: # '4. RUNNING THE SCRIPT'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=230&height=24&lines=4.+RUNNING+THE+SCRIPT" alt="4. RUNNING THE SCRIPT" id="4-running-the-script" />

1. **Running the Application:**

    To start the application in development mode, use:

    ```bash
    pnpm dev
    ```

    This will run the server with nodemon, automatically restarting when any changes are made.

2. **To build the application, use:**

    ```bash
    pnpm build
    ```

    This will build the application.

3. **To run the application, use:**

    To run the application, use:

    ```bash
    pnpm start
    ```

    This will run the project.

4. **Code Prettier:**

    - To check if files are formatted correctly:

        ```bash
        pnpm prettier:check
        ```

    - To format files:

        ```bash
        pnpm prettier:fix
        ```

### Docker

1. **Build the Docker Compose Services:**

    ```bash
    pnpm docker:build-dev
    ```

2. **Run the Docker Compose Services:**

    ```bash
    pnpm docker:run-dev
    ```

3. **Stop the Containers:**

    ```bash
    pnpm docker:stop-dev
    ```

4. **Rebuild the Containers:**

    ```bash
    pnpm docker:rebuild-dev
    ```

[//]: # '5. ERROR HANDLING'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=195&height=24&lines=5.+ERROR+HANDLING" alt="5. ERROR HANDLING" id="5-error-handling" />

<br/>

[//]: # '6. HOSTING'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=112&height=24&lines=6.+HOSTING" alt="6. HOSTING" id="6-hosting" />

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/montasim/quillink)

<details>
    <summary>
        Step-by-step guide on setting up your own Vercel instance:
    </summary>

Vercel is the recommended option for hosting the files since it is free and easy to set up.

1.  Go to [vercel.com](https://vercel.com/).
2.  Click on `Log in`.
    ![Login page](https://files.catbox.moe/qwqrjn.png)
3.  Sign in with GitHub by pressing `Continue with GitHub`.
    ![Sign in with GitHub](https://files.catbox.moe/18vwjq.png)
4.  Sign in to GitHub and allow access to all repositories if prompted.
5.  [Fork this repo.](https://github.com/montasim/quillink/fork)
6.  Go back to your [Vercel dashboard](https://vercel.com/dashboard).
7.  To import a project, click the `Add New...` button and select the `Project` option.
    ![Add new project](https://files.catbox.moe/h1a87z.png)
8.  Click the `Continue with GitHub` button, search for the required Git Repository and import it by clicking the `Import` button. Alternatively, you can import a Third-Party Git Repository using the `Import Third-Party Git Repository ->` link at the bottom of the page.
    ![Select GitHub project](https://files.catbox.moe/9ubkss.png)
9.  Create a personal access token (PAT) [here](https://github.com/settings/tokens/new) and enable the `repo` and `user` permissions (this allows access to see private repo and user stats).
10. Copy all the .env.development file as environment variables in the Vercel dashboard.
11. Click deploy, and you're good to go. See your domains to use the API!
</details>

<br/>

[//]: # '7. USED PACKAGES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=185&height=24&lines=7.+USED+PACKAGES" alt="7. USED PACKAGES" id="7-used-packages" />

<br/>

[//]: # '8. TOOLS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=85&height=24&lines=8.+TOOLS" alt="8. TOOLS" id="8-tools" />

1. [WebStorm](https://www.jetbrains.com/webstorm/)
2. [Postman](https://www.postman.com/)
3. [Swagify.io](https://swagify.io/convert/)

<br/>

[//]: # '9. ARTICLES'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=115&height=24&lines=9.+ARTICLES" alt="9. ARTICLES" id="9-articles" />

<br/>

[//]: # '10. DO NOT FORGET TO DO'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=255&height=24&lines=10.+DO+NOT+FORGET+TO+DO" alt="10. DO NOT FORGET TO DO" id="10-do-not-forget-to-do" />

<br/>

[//]: # '11. TUTORIALS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=135&height=24&lines=11.+TUTORIALS" alt="11. TUTORIALS" id="11-tutorials" />

<br/>

[//]: # '12. INSPIRATIONS'

<br/>

[//]: # '13. CONTRIBUTE'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=155&height=24&lines=13.+CONTRIBUTE" alt="13. CONTRIBUTE" id="13-contribute" />

Contributions are always welcome!
Please read the [contribution guidelines](CONTRIBUTION.md) and [contributor license agreement](CLA.md).

<br/>

[//]: # '14. CONTRIBUTORS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=185&height=24&lines=14.+CONTRIBUTORS" alt="14. CONTRIBUTORS" id="14-contributors" />

<img loading="lazy" src="https://badges.pufler.dev/contributors/montasim/quillink?size=50&padding=5&perRow=10&bots=true" alt="contributors" />

<br/>

[//]: # '15. SPECIAL THANKS'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=195&height=24&lines=15.+SPECIAL+THANKS" alt="15. SPECIAL THANKS" id="15-special-thanks" />

<br/>

[//]: # '16. LICENSE'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=108&height=24&lines=16.+LICENSE" alt="16. LICENSE" id="16-license" />

[![Licence](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)

<br/>

[//]: # '17. CONTACT'

## <img loading="lazy" src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=20&duration=1&pause=1&color=00B8B5&center=true&vCenter=true&repeat=false&width=130&height=24&lines=17.+CONTACT" alt="17. CONTACT" id="17-contact" />

<!-- social media links start -->
<table align="center">
    <thead align="center">
        <tr>
            <th>
                <a href="https://www.linkedin.com/in/montasim" target="_blank" rel="noopener noreferrer" title="linkedin.com/in/montasim">
                    <img loading="lazy" alt="linkedin icon" src="https://cdn.simpleicons.org/linkedin/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://www.github.com/montasim" target="_blank" rel="noopener noreferrer" title="github.com/montasim">
                    <img loading="lazy" alt="github icon" src="https://cdn.simpleicons.org/github/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://stackoverflow.com/users/20348607/montasim" target="_blank" rel="noopener noreferrer" title="stackoverflow.com/users/20348607/montasim">
                    <img loading="lazy" alt="github icon" src="https://cdn.simpleicons.org/stackoverflow/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://montasim-dev.web.app/" target="_blank" rel="noopener noreferrer" title="montasim-dev.web.app">
                    <img loading="lazy" alt="web icon" src="https://cdn.simpleicons.org/googlechrome/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="mailto:montasimmamun@gmail.com" target="_blank" rel="noopener noreferrer" title="montasimmamun@gmail.com">
                    <img loading="lazy" alt="gmail icon" src="https://cdn.simpleicons.org/gmail/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://www.facebook.com/montasimmamun/" target="_blank" rel="noopener noreferrer" title="facebook.com/montasimmamun">
                    <img loading="lazy" alt="facebook icon" src="https://cdn.simpleicons.org/facebook/EB008B" width="35px">
                </a>
            </th>
            <th>
                <a href="https://x.com/montasimmamun" target="_blank" rel="noopener noreferrer" title="https://x.com/montasimmamun">
                    <img loading="lazy" alt="x icon" src="https://cdn.simpleicons.org/x/EB008B" width="35px">
                </a>
            </th>
        </tr>
    </thead>
</table>
<!-- social media links end -->

<br/>
<br/>
<br/>
