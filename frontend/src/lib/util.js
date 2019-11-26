import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { parseCpu, parseRam, unparseCpu, unparseRam } from './units';
TimeAgo.addLocale(en);

const TIME_AGO = new TimeAgo();

export function timeAgo(date) {
  return TIME_AGO.format(new Date(date), 'time');
}

export function getPercentStr(value, total) {
  if (total === 0) {
    return null;
  }
  const percentage = value / total * 100;
  const decimals = percentage % 10 > 0 ? 1 : 0;
  return `${percentage.toFixed(decimals)} %`;

}

export function getReadyReplicas(item) {
  return (item.status.readyReplicas || item.status.numberReady || 0);
}

export function getTotalReplicas(item) {
  return (item.spec.replicas || item.status.currentNumberScheduled || 0);
}

export function getResourceStr(value, resourceType) {
  const resourceFormatters = {
    cpu: unparseCpu,
    memory: unparseRam,
  };

  const valueInfo = resourceFormatters[resourceType](value);
  return `${valueInfo.value}${valueInfo.unit}`;
}

export function getResourceMetrics(item, metrics, resourceType) {
  const type = resourceType.toLowerCase();
  const resourceParsers = {
    cpu: parseCpu,
    memory: parseRam,
  };

  const parser = resourceParsers[type];
  const itemMetrics = metrics.find(itemMetrics => itemMetrics.metadata.name == item.metadata.name);

  const used = parser(itemMetrics.usage[type]);
  const capacity = parser(item.status.capacity[type]);

  return [used, capacity];
}
