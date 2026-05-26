#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Load environment variables from .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, ".env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const API_VERSION = process.env.META_API_VERSION || "v20.0";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID;
const PAGE_ID = process.env.META_PAGE_ID;
const WHATSAPP_PHONE_NUMBER_ID = process.env.META_WHATSAPP_PHONE_NUMBER_ID;

const isMockMode = !ACCESS_TOKEN || ACCESS_TOKEN.trim() === "";

// Create the MCP Server
const server = new McpServer({
  name: "meta-mcp-server",
  version: "1.0.0",
});

// Axios client for Meta Graph API
const metaClient = axios.create({
  baseURL: `https://graph.facebook.com/${API_VERSION}`,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Helper for Vietnamese currency formatting (§4 Currency format rule)
function formatVND(amount) {
  if (typeof amount !== "number") return amount;
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" })
    .format(amount)
    .replace("₫", "VNĐ")
    .trim();
}

// Helper to parse Meta API budget (VND accounts return raw value, USD/EUR return cents)
function parseMetaBudget(amountStr) {
  if (!amountStr) return 0;
  const amount = parseInt(amountStr);
  // If the value is >= 10000, it is highly likely a raw VND/JPY currency value from Meta.
  // Otherwise, it is returned in cents (like USD/EUR) and needs to be divided by 100.
  if (amount >= 10000) {
    return amount;
  }
  return amount / 100;
}

console.error(
  isMockMode
    ? "[Meta MCP Server] RUNNING IN MOCK/SANDBOX MODE (No Meta Access Token configured)"
    : `[Meta MCP Server] Running in PRODUCTION Mode targeting Meta API ${API_VERSION}`
);

// --- TOOLS REGISTRATION ---

// 1. Tool: Get Ad Campaigns
server.tool(
  "meta_ads_get_campaigns",
  "Retrieve a list of advertising campaigns from the Meta Ad Account. (Works in Sandbox/Mock Mode if no credentials configured)",
  {},
  async () => {
    if (isMockMode) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "sandbox",
                campaigns: [
                  {
                    id: "act_10101_camp_001",
                    name: "Mùa Hè Rực Rỡ 2026 - Conversion Campaign",
                    status: "ACTIVE",
                    objective: "OUTCOMES",
                    daily_budget: formatVND(500000),
                    lifetime_budget: "N/A",
                    budget_remaining: formatVND(320000),
                  },
                  {
                    id: "act_10101_camp_002",
                    name: "Tương Tác Khách Hàng Tiềm Năng - Messenger Ads",
                    status: "ACTIVE",
                    objective: "OUTCOMES",
                    daily_budget: formatVND(200000),
                    lifetime_budget: "N/A",
                    budget_remaining: formatVND(50000),
                  },
                  {
                    id: "act_10101_camp_003",
                    name: "Khách hàng cũ - Remarketing Brand Awareness",
                    status: "PAUSED",
                    objective: "OUTCOMES",
                    daily_budget: "N/A",
                    lifetime_budget: formatVND(10000000),
                    budget_remaining: formatVND(4500000),
                  },
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    try {
      const response = await metaClient.get(`/${AD_ACCOUNT_ID}/campaigns`, {
        params: {
          fields: "id,name,status,objective,daily_budget,lifetime_budget,budget_remaining",
        },
      });

      // Format response budgets for display using smart parsing
      const formattedCampaigns = response.data.data.map((c) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        objective: c.objective,
        daily_budget: c.daily_budget ? formatVND(parseMetaBudget(c.daily_budget)) : "N/A",
        lifetime_budget: c.lifetime_budget ? formatVND(parseMetaBudget(c.lifetime_budget)) : "N/A",
        budget_remaining: c.budget_remaining ? formatVND(parseMetaBudget(c.budget_remaining)) : "N/A",
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { status: "success", mode: "production", campaigns: formattedCampaigns },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching campaigns: ${error.response?.data?.error?.message || error.message}`,
          },
        ],
      };
    }
  }
);

// 2. Tool: Get Campaign Insights
server.tool(
  "meta_ads_get_campaign_insights",
  "Get key performance metrics (clicks, impressions, spend, CTR, reach, conversions) for a campaign",
  {
    campaign_id: z.string().describe("The Facebook Campaign ID (e.g. act_10101_camp_001)"),
    date_preset: z
      .enum(["today", "yesterday", "this_month", "last_7d", "last_30d"])
      .optional()
      .default("last_7d")
      .describe("Date range preset for insights"),
  },
  async ({ campaign_id, date_preset }) => {
    if (isMockMode || campaign_id.startsWith("act_10101_")) {
      // Mock metrics
      const spendNum = campaign_id.includes("001") ? 1800000 : campaign_id.includes("002") ? 150000 : 5500000;
      const impressions = campaign_id.includes("001") ? 92000 : campaign_id.includes("002") ? 14000 : 250000;
      const clicks = campaign_id.includes("001") ? 3450 : campaign_id.includes("002") ? 980 : 5100;
      const conversions = campaign_id.includes("001") ? 112 : campaign_id.includes("002") ? 45 : 320;
      
      const ctr = ((clicks / impressions) * 100).toFixed(2) + "%";
      const cpc = formatVND(spendNum / clicks);
      const cpa = formatVND(spendNum / conversions);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "sandbox",
                campaign_id,
                date_preset,
                metrics: {
                  spend: formatVND(spendNum),
                  impressions,
                  reach: Math.round(impressions * 0.85),
                  clicks,
                  ctr,
                  cpc,
                  conversions,
                  cpa,
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    try {
      const response = await metaClient.get(`/${campaign_id}/insights`, {
        params: {
          date_preset,
          fields: "impressions,clicks,spend,reach,actions",
        },
      });

      const data = response.data.data[0] || {};
      const spend = data.spend ? parseFloat(data.spend) : 0;
      const clicks = data.clicks ? parseInt(data.clicks) : 0;
      const impressions = data.impressions ? parseInt(data.impressions) : 0;
      const reach = data.reach ? parseInt(data.reach) : 0;

      // Extract conversions (actions with outcome or purchase types)
      const actions = data.actions || [];
      const conversionsAction = actions.find(
        (a) => a.action_type === "purchase" || a.action_type === "offsite_conversion.custom"
      );
      const conversions = conversionsAction ? parseInt(conversionsAction.value) : 0;

      const ctr = impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) + "%" : "0%";
      const cpc = clicks > 0 ? formatVND(spend / clicks) : "N/A";
      const cpa = conversions > 0 ? formatVND(spend / conversions) : "N/A";

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "production",
                campaign_id,
                date_preset,
                metrics: {
                  spend: formatVND(spend),
                  impressions,
                  reach,
                  clicks,
                  ctr,
                  cpc,
                  conversions,
                  cpa,
                },
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching insights: ${error.response?.data?.error?.message || error.message}`,
          },
        ],
      };
    }
  }
);

// 3. Tool: Update Campaign Budget
server.tool(
  "meta_ads_update_campaign_budget",
  "Update a campaign's daily or lifetime budget",
  {
    campaign_id: z.string().describe("The campaign ID to update"),
    budget_type: z.enum(["daily", "lifetime"]).describe("Budget type to update"),
    amount: z.number().positive().describe("New budget amount in VND/Currency (e.g. 500000)"),
  },
  async ({ campaign_id, budget_type, amount }) => {
    if (isMockMode || campaign_id.startsWith("act_10101_")) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "sandbox",
                campaign_id,
                updated: {
                  budget_type: budget_type === "daily" ? "daily_budget" : "lifetime_budget",
                  amount: formatVND(amount),
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    try {
      const budgetKey = budget_type === "daily" ? "daily_budget" : "lifetime_budget";
      
      // Meta Marketing API expects budgets in cents (x100) for standard currencies, but for VND it can be direct.
      // We will send the amount directly. If user uses standard currency, they should configure it accordingly.
      const response = await metaClient.post(`/${campaign_id}`, {
        [budgetKey]: amount,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "production",
                campaign_id,
                result: response.data,
                updated: {
                  budget_type: budgetKey,
                  amount: formatVND(amount),
                },
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error updating budget: ${error.response?.data?.error?.message || error.message}`,
          },
        ],
      };
    }
  }
);

// 4. Tool: Send WhatsApp Message (WhatsApp Cloud API)
server.tool(
  "meta_whatsapp_send_message",
  "Send a WhatsApp message to a customer phone number using Meta WhatsApp Cloud API",
  {
    to_phone_number: z
      .string()
      .describe("Recipient phone number with country code (e.g., +84912345678 or 84912345678)"),
    message_text: z.string().describe("The text message content to send"),
  },
  async ({ to_phone_number, message_text }) => {
    const formattedPhone = to_phone_number.replace("+", "").trim();

    if (isMockMode) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "sandbox",
                to: formattedPhone,
                message_text,
                message_id: `wamid.HBgM${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                timestamp: new Date().toISOString(),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    try {
      const response = await metaClient.post(`/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedPhone,
        type: "text",
        text: {
          preview_url: false,
          body: message_text,
        },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "production",
                to: formattedPhone,
                response: response.data,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error sending WhatsApp message: ${error.response?.data?.error?.message || error.message}`,
          },
        ],
      };
    }
  }
);

// 5. Tool: Send Messenger Page Message (Messenger Platform)
server.tool(
  "meta_messenger_send_message",
  "Send a message to a Facebook Page user via Page-Scoped ID (PSID)",
  {
    recipient_psid: z.string().describe("The recipient Page-Scoped User ID (PSID)"),
    message_text: z.string().describe("The text message content to send"),
  },
  async ({ recipient_psid, message_text }) => {
    if (isMockMode) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "sandbox",
                recipient_psid,
                message_text,
                message_id: `m_${Math.random().toString(36).substring(2, 12)}`,
                timestamp: new Date().toISOString(),
              },
              null,
              2
            ),
          },
        ],
      };
    }

    try {
      const response = await metaClient.post(`/me/messages`, {
        recipient: { id: recipient_psid },
        message: { text: message_text },
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "production",
                recipient_psid,
                message_id: response.data.message_id,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error sending Messenger message: ${error.response?.data?.error?.message || error.message}`,
          },
        ],
      };
    }
  }
);

// 6. Tool: Get Facebook Page Conversations
server.tool(
  "meta_messenger_get_conversations",
  "Get recent customer conversations and message history for the configured Facebook Page",
  {
    limit: z.number().int().positive().optional().default(5).describe("Number of conversations to fetch"),
  },
  async ({ limit }) => {
    if (isMockMode) {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                status: "success",
                mode: "sandbox",
                conversations: [
                  {
                    id: "t_100293847293",
                    updated_time: new Date(Date.now() - 3600000).toISOString(),
                    participants: [
                      { name: "Nguyễn Văn A", id: "psid_992010" }
                    ],
                    snippet: "Dịch vụ bên bạn giá thế nào?",
                    messages: [
                      { from: "Nguyễn Văn A", text: "Xin chào! Mình muốn hỏi về dịch vụ.", time: "10:30" },
                      { from: "Page Support", text: "Chào bạn, mình có thể giúp gì cho bạn?", time: "10:32" },
                      { from: "Nguyễn Văn A", text: "Dịch vụ bên bạn giá thế nào?", time: "10:35" }
                    ]
                  },
                  {
                    id: "t_100293847294",
                    updated_time: new Date(Date.now() - 7200000).toISOString(),
                    participants: [
                      { name: "Trần Thị B", id: "psid_992011" }
                    ],
                    snippet: "Tư vấn cho mình gói Marketing nhé",
                    messages: [
                      { from: "Trần Thị B", text: "Tư vấn cho mình gói Marketing nhé", time: "09:15" }
                    ]
                  }
                ]
              },
              null,
              2
            ),
          },
        ],
      };
    }

    try {
      const response = await metaClient.get(`/${PAGE_ID}/conversations`, {
        params: {
          fields: "id,updated_time,participants,messages.limit(5){message,from,created_time}",
          limit,
        },
      });

      const conversations = response.data.data.map((c) => {
        const msgs = c.messages?.data || [];
        return {
          id: c.id,
          updated_time: c.updated_time,
          participants: c.participants?.data || [],
          snippet: msgs[0]?.message || "",
          messages: msgs.map((m) => ({
            from: m.from?.name || "Unknown",
            text: m.message,
            time: m.created_time,
          })).reverse(), // chronologically ordered
        };
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { status: "success", mode: "production", conversations },
              null,
              2
            ),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching conversations: ${error.response?.data?.error?.message || error.message}`,
          },
        ],
      };
    }
  }
);

// --- RUN SERVER ---
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[Meta MCP Server] Connected successfully via Stdio Transport.");
}

run().catch((error) => {
  console.error("[Meta MCP Server] Fatal initialization error:", error);
  process.exit(1);
});
