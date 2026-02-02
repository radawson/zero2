"use server";

import {
  createChannel,
  assignAuthorToChannel,
  removeAuthorFromChannel,
} from "@/src/lib/admin";

export async function createChannelAction(formData: FormData) {
  await createChannel(formData);
}

export async function assignAuthorAction(channelId: string, userId: string) {
  await assignAuthorToChannel(channelId, userId);
}

export async function removeAuthorAction(channelId: string, userId: string) {
  await removeAuthorFromChannel(channelId, userId);
}
