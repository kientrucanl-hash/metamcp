# Meta MCP Server (Ads & Messenger / WhatsApp)

A Model Context Protocol (MCP) Server that allows LLMs to interact with Meta APIs to manage Facebook Ads campaigns, check insights, send WhatsApp Business messages, and handle Messenger Page messages.

This server automatically operates in a **Mock/Sandbox Mode** if no real credentials are provided. This allows you to test the tools immediately inside your MCP client (like Claude Desktop) without any Meta API credentials. Once you configure real tokens, it seamlessly switches to interact with production Meta APIs.

---

## Tools Provided

### Meta Ads
1. **`meta_ads_get_campaigns`**: List all ad campaigns in the configured account, including budgets and status.
2. **`meta_ads_get_campaign_insights`**: Fetch key metrics (impressions, clicks, spend, CTR, reach, conversions) for campaigns.
3. **`meta_ads_update_campaign_budget`**: Update a campaign's daily or lifetime budget.

### Meta Messenger & WhatsApp
4. **`meta_whatsapp_send_message`**: Send a text message to a phone number using Meta WhatsApp Cloud API.
5. **`meta_messenger_send_message`**: Send a message to a Facebook Page user via Page-Scoped ID (PSID).
6. **`meta_messenger_get_conversations`**: Fetch recent customer conversations and message history for the Page.

---

## Getting Started

### 1. Installation
Navigate to the directory and install the dependencies:
```bash
npm install
```

### 2. Configuration (`.env`)
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

If you want to use **Production Mode**, obtain the required credentials from [Meta for Developers Portal](https://developers.facebook.com/) and populate your `.env` file:
* **`META_ACCESS_TOKEN`**: Long-lived System User Access Token (recommended) or Page Access Token.
* **`META_AD_ACCOUNT_ID`**: Ad account ID prefixed with `act_` (e.g. `act_1234567890`).
* **`META_PAGE_ID`**: Your Facebook Page ID.
* **`META_WHATSAPP_PHONE_NUMBER_ID`**: Phone Number ID for WhatsApp Cloud API.
* **`META_WHATSAPP_BUSINESS_ACCOUNT_ID`**: WhatsApp Business Account ID.

*Note: Leaving `META_ACCESS_TOKEN` blank runs the server in **Mock/Sandbox Mode**.*

---

## Integrating with Claude Desktop

Add this server to your Claude Desktop configuration file:
* **Windows Path**: `%APPDATA%\Claude\claude_desktop_config.json`
* **macOS Path**: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add the following to the `mcpServers` block:

```json
{
  "mcpServers": {
    "meta-mcp": {
      "command": "node",
      "args": ["g:/.AIWork/.9-meta/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

Make sure the path to `index.js` points to your absolute project directory. Restart Claude Desktop after making these changes.

---

## How to Obtain Meta Access Tokens & IDs

### A. General Setup
1. Go to [Meta for Developers](https://developers.facebook.com/) and register.
2. Click **Create App** and choose **Business** as the app type (this provides access to Marketing Ads API and WhatsApp/Messenger Business).
3. Associate the app with your Meta Business Manager Account.

### B. Setup Meta Marketing API (Ads)
1. Inside your Meta App dashboard, add the **Marketing API** product.
2. In your Business Manager Console, create a **System User** (System users do not have expiring tokens).
3. Assign your Ad Account to this System User with **Manage campaigns** access.
4. Click **Generate Token**, select your App, and choose the permissions: `ads_management`, `ads_read`, `business_management`.
5. Save the generated token to `META_ACCESS_TOKEN` and your Ad Account ID (e.g. `act_xxxxxx`) to `META_AD_ACCOUNT_ID`.

### C. Setup WhatsApp Cloud API
1. Inside your Meta App dashboard, add the **WhatsApp** product.
2. You will be assigned a temporary **Phone Number ID**, a **WhatsApp Business Account ID**, and a **Temporary Access Token**.
3. Under the WhatsApp "Getting Started" page, add your personal phone number to the **Sandbox Test Recipients** list.
4. Use these temporary IDs in `.env` to test. For permanent setups, register a real phone number and generate a permanent System User Token.

### D. Setup Messenger Platform
1. Inside your Meta App dashboard, add the **Messenger** product.
2. Go to Messenger settings and link your Facebook Page.
3. Generate a **Page Access Token** and copy your **Page ID**.
4. Grant the permissions `pages_messaging`, `pages_read_engagement`, `pages_show_list` to the token.
