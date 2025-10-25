/**
 * 日期格式化选项
 */
interface DateFormatOptions {
  date?: Date | string | number;
  format?: string;
  lang?: 'zh-CN' | 'en-US';
}

/**
 * 日期格式化工具类
 */
class DateFormatter {
  /**
   * 默认格式化模板
   */
  private static readonly DEFAULT_FORMATS: Record<string, string> = {
    date: 'yyyy-MM-dd',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    time: 'HH:mm:ss',
    full: 'yyyy-MM-dd HH:mm:ss.SSS',
    iso: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    chinese: 'yyyy年MM月dd日 HH时mm分ss秒',
  };

  /**
   * 语言包
   */
  private static readonly LANGUAGES = {
    'zh-CN': {
      months: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
      shortMonths: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      shortWeekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      am: '上午',
      pm: '下午',
    },
    'en-US': {
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      am: 'AM',
      pm: 'PM',
    },
  };

  /**
   * 格式化日期
   * @param options 格式化选项
   * @returns 格式化后的日期字符串
   */
  static format(options: DateFormatOptions): string;
  static format(date?: Date | string | number, format?: string, lang?: 'zh-CN' | 'en-US'): string;
  static format(
    arg1?: DateFormatOptions | Date | string | number,
    arg2?: string,
    arg3?: 'zh-CN' | 'en-US'
  ): string {
    let date: Date;
    let format: string;
    let lang: 'zh-CN' | 'en-US';

    // 处理重载
    if (typeof arg1 === 'object' && !(arg1 instanceof Date)) {
      const options = arg1 as DateFormatOptions;
      date = this.parseDate(options.date || new Date());
      format = options.format || this.DEFAULT_FORMATS.datetime;
      lang = options.lang || 'zh-CN';
    } else {
      date = this.parseDate(arg1);
      format = arg2 || this.DEFAULT_FORMATS.datetime;
      lang = arg3 || 'zh-CN';
    }

    return this.formatDate(date, format, lang);
  }

  /**
   * 解析日期
   */
  private static parseDate(date?: Date | string | number): Date {
    if (!date) return new Date();

    if (date instanceof Date) return date;

    if (typeof date === 'number') {
      // 处理时间戳（支持秒和毫秒）
      return date < 10000000000 ? new Date(date * 1000) : new Date(date);
    }

    if (typeof date === 'string') {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) return parsed;

      // 尝试处理常见的中文日期格式
      const chineseDate = date.replace(/[年月日时分秒]/g, '-').replace(/-$/g, '');
      const parsedChinese = new Date(chineseDate);
      if (!isNaN(parsedChinese.getTime())) return parsedChinese;
    }

    throw new Error(`Invalid date: ${date}`);
  }

  /**
   * 核心格式化方法
   */
  private static formatDate(date: Date, format: string, lang: 'zh-CN' | 'en-US'): string {
    const langPack = this.LANGUAGES[lang];

    const tokens: Record<string, () => string> = {
      // 年份
      yyyy: () => date.getFullYear().toString(),
      yy: () => date.getFullYear().toString().slice(-2),
      y: () => date.getFullYear().toString(),

      // 月份
      MM: () => (date.getMonth() + 1).toString().padStart(2, '0'),
      M: () => (date.getMonth() + 1).toString(),
      MMMM: () => langPack.months[date.getMonth()],
      MMM: () => langPack.shortMonths[date.getMonth()],

      // 日期
      dd: () => date.getDate().toString().padStart(2, '0'),
      d: () => date.getDate().toString(),

      // 星期
      EEEE: () => langPack.weekdays[date.getDay()],
      EEE: () => langPack.shortWeekdays[date.getDay()],
      E: () => (date.getDay() || 7).toString(), // 周一到周日: 1-7

      // 24小时制
      HH: () => date.getHours().toString().padStart(2, '0'),
      H: () => date.getHours().toString(),
      hh: () => (date.getHours() % 12 || 12).toString().padStart(2, '0'),
      h: () => (date.getHours() % 12 || 12).toString(),

      // 分钟
      mm: () => date.getMinutes().toString().padStart(2, '0'),
      m: () => date.getMinutes().toString(),

      // 秒
      ss: () => date.getSeconds().toString().padStart(2, '0'),
      s: () => date.getSeconds().toString(),

      // 毫秒
      SSS: () => date.getMilliseconds().toString().padStart(3, '0'),
      S: () => date.getMilliseconds().toString(),

      // 上午/下午
      tt: () => (date.getHours() < 12 ? langPack.am : langPack.pm),
      t: () => (date.getHours() < 12 ? langPack.am[0] : langPack.pm[0]),

      // 季度
      q: () => Math.floor((date.getMonth() + 3) / 3).toString(),

      // 时间戳
      T: () => date.getTime().toString(),

      // 时区
      xxx: () => {
        const offset = -date.getTimezoneOffset();
        const sign = offset >= 0 ? '+' : '-';
        const hours = Math.floor(Math.abs(offset) / 60)
          .toString()
          .padStart(2, '0');
        const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
        return `${sign}${hours}:${minutes}`;
      },
    };

    return format.replace(
      /(yyyy|yy|y|MMMM|MMM|MM|M|dd|d|EEEE|EEE|E|HH|H|hh|h|mm|m|ss|s|SSS|S|tt|t|q|T|xxx)/g,
      match => (tokens[match] ? tokens[match]() : match)
    );
  }

  /**
   * 快捷方法 - 格式化日期部分
   */
  static formatDatePart(date?: Date | string | number): string {
    return this.format({ date, format: this.DEFAULT_FORMATS.date });
  }

  /**
   * 快捷方法 - 格式化日期时间
   */
  static formatDateTime(date?: Date | string | number): string {
    return this.format({ date, format: this.DEFAULT_FORMATS.datetime });
  }

  /**
   * 快捷方法 - 格式化时间部分
   */
  static formatTime(date?: Date | string | number): string {
    return this.format({ date, format: this.DEFAULT_FORMATS.time });
  }

  /**
   * 快捷方法 - 中文日期格式
   */
  static formatChinese(date?: Date | string | number): string {
    return this.format({ date, format: this.DEFAULT_FORMATS.chinese, lang: 'zh-CN' });
  }

  /**
   * 获取预设格式
   */
  static getPresetFormat(key: keyof typeof DateFormatter.DEFAULT_FORMATS): string {
    return this.DEFAULT_FORMATS[key];
  }
}

// 导出默认实例和类型
export { DateFormatter };
export type { DateFormatOptions };
export default DateFormatter;
