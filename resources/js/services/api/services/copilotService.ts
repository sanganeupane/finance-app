import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export interface CopilotMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const copilotService = {
    listConversations: async () =>
        unwrap(apiClient.get<{ data: CopilotMessage[] }>(API_ENDPOINTS.copilot.conversation)),

    sendMessage: async (content: string) =>
        unwrap(
            apiClient.post<{ data: CopilotMessage }>(API_ENDPOINTS.copilot.conversation, { content }),
        ),
};
