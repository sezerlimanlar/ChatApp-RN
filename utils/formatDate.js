import { formatDistanceToNow, fromUnixTime } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function formatDate(timestamp) {
  // Unix timestamp'ını Date nesnesine dönüştür
  const date = fromUnixTime(timestamp / 1000); // timestamp milisaniye cinsindendir, saniyeye çeviriyoruz

  const formattedDate = formatDistanceToNow(date, {
    addSuffix: true,
    locale: tr,
  });

  return formattedDate;
}
