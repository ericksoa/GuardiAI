# GuardiAI

GuardiAI is an automated code review bot that checks submitted pull requests for potential security vulnerabilities in a Next.js project. It utilizes a webhook to receive notifications when pull requests are created, and provides feedback on the code changes to help maintain a secure codebase.

## Features

- Listens for pull request events using a webhook.
- Analyzes the code changes in a pull request for potential security vulnerabilities.
- Provides feedback on detected issues, such as SQL injections, insecure file access, or the use of `eval()`.

## Setup

To set up GuardiAI, follow these steps:

1. Clone this repository and install the dependencies:
   - git clone https://github.com/yourusername/GuardiAI.git
   - cd GuardiAI
   - npm install

2. Create a `.env.local` file in the root folder and add your GitHub App ID and App Secret:
   - GITHUB_APP_ID=your_github_app_id
   -  GITHUB_APP_SECRET=your_github_app_secret

3. Deploy the application to Vercel or a similar platform.

4. In your GitHub repository settings, set up a webhook with the following configuration:
   - Payload URL: https://your-app-url.vercel.app/api/webhook
   - Content type: application/json
   - Secret: your_github_app_secret
   - Events: Select "Pull requests"

5. Once the webhook is set up, GuardiAI will listen for pull request events and provide feedback on code changes.

## Usage

To test GuardiAI, create a new branch in your repository, make changes to the code, and create a pull request. GuardiAI will automatically analyze the code changes and provide feedback on potential security vulnerabilities.

## Contributing

Contributions are welcome! Feel free to submit issues, feature requests, or pull requests to help improve GuardiAI.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
