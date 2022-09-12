import {defaults} from './defaults';
export default function setDownloadFilename(str) {
  if(str) {
    str = str
      .replace(/(\.csv)$/, '')
      .replace(/[/:]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-/, '')
      .replace(/-$/, '');

    return str + ' [' + new Date().toISOString().split('T')[0] + '].csv';
  }

  return defaults.downloadFilename;
}
