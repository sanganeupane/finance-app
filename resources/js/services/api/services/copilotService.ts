import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export interface CopilotMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const copilotService = {
    listConversations: (customerId: string) =>
        apiClient.get<{ data: CopilotMessage[] }>(API_ENDPOINTS.copilot.conversation(customerId)),
};
