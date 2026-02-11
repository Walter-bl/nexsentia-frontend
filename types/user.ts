export interface User {
  id: string;
  name: string;
  email: string;
}


export interface UerInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: number;
  role: string;
  permissions: string[];
  integrations: UserIntegrations;
}

export interface UserIntegrations {
  jiraConnected: boolean;
  serviceNowConnected: boolean;
  slackConnected: boolean;
  teamsConnected: boolean;
  gmailConnected:boolean,
  outlookConnected:boolean,
}

