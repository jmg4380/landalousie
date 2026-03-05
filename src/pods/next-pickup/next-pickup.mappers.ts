import type { NextPickup } from '#contents/next-pickup';

const isDateTimeExpirationReached = (dateTime: string): boolean =>
  new Date(dateTime).getTime() < Date.now();

export const mapDeliveryDateTime = (
  description: string,
  nextPickup: NextPickup
): string => {
  const dateTime = isDateTimeExpirationReached(nextPickup.maxOrderDateTime)
    ? nextPickup.nextDeliveryDateTime
    : nextPickup.deliveryDateTime;

  return description.replace(
    '{{deliveryDateTime}}',
    new Date(dateTime).toLocaleDateString(nextPickup.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  );
};

export const mapMaxOrderDateTime = (
  description: string,
  nextPickup: NextPickup
): string => {
  const dateTime = isDateTimeExpirationReached(nextPickup.maxOrderDateTime)
    ? nextPickup.nextMaxOrderDeliveryDateTime
    : nextPickup.maxOrderDateTime;

  return description.replace(
    '{{maxOrderDateTime}}',
    new Date(dateTime).toLocaleDateString(nextPickup.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};
