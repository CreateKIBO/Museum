/* dongba-db.js — 东巴文字符映射数据库
 * 每个条目: { cn: 中文, svg: SVG路径字符串, pinyin: 拼音, en: 英文, cat: 分类 }
 * SVG viewBox 统一为 0 0 100 100
 */

var DONGBA_DB = [
  // === 自然 ===
  { cn:"太阳", svg:'<circle cx="50" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="8" x2="50" y2="2" stroke="currentColor" stroke-width="2.5"/><line x1="30" y1="14" x2="36" y2="20" stroke="currentColor" stroke-width="2.5"/><line x1="70" y1="14" x2="64" y2="20" stroke="currentColor" stroke-width="2.5"/><line x1="28" y1="30" x2="22" y2="30" stroke="currentColor" stroke-width="2.5"/><line x1="72" y1="30" x2="78" y2="30" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/ni³³/", en:"Sun", cat:"nature" },
  { cn:"月亮", svg:'<path d="M25 20 Q75 20 75 50 Q75 80 50 80 Q25 80 25 55 Q25 35 50 35 Q70 35 70 50" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/le³³/", en:"Moon", cat:"nature" },
  { cn:"星", svg:'<path d="M50 15 L55 35 L75 35 L60 48 L65 68 L50 55 L35 68 L40 48 L25 35 L45 35 Z" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/xər³³/", en:"Star", cat:"nature" },
  { cn:"山", svg:'<path d="M15 70 L50 20 L85 70 Z" fill="none" stroke="currentColor" stroke-width="4"/><line x1="10" y1="78" x2="90" y2="78" stroke="currentColor" stroke-width="4"/>', pinyin:"/dʑy²¹/", en:"Mountain", cat:"nature" },
  { cn:"水", svg:'<path d="M10 50 Q25 25 40 40 Q55 55 70 35 Q85 15 95 40" fill="none" stroke="currentColor" stroke-width="3"/><path d="M5 70 Q20 45 35 58 Q50 72 65 52 Q80 32 95 55" fill="none" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/dzi³³/", en:"Water", cat:"nature" },
  { cn:"火", svg:'<path d="M25 80 Q35 50 50 20 Q65 50 75 80" fill="none" stroke="currentColor" stroke-width="3"/><path d="M35 65 Q50 45 65 65" fill="none" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/mɯ³³/", en:"Fire", cat:"nature" },
  { cn:"风", svg:'<path d="M15 40 Q40 30 60 40 Q80 50 90 35" fill="none" stroke="currentColor" stroke-width="3"/><path d="M10 55 Q35 45 55 55 Q75 65 95 50" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M15 70 Q40 60 60 70 Q80 80 95 65" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"/xər⁵⁵/", en:"Wind", cat:"nature" },
  { cn:"雨", svg:'<path d="M10 30 Q30 15 50 25 Q70 35 90 20" fill="none" stroke="currentColor" stroke-width="3"/><line x1="25" y1="45" x2="22" y2="65" stroke="currentColor" stroke-width="2"/><line x1="45" y1="45" x2="42" y2="65" stroke="currentColor" stroke-width="2"/><line x1="65" y1="45" x2="62" y2="65" stroke="currentColor" stroke-width="2"/><line x1="80" y1="40" x2="77" y2="60" stroke="currentColor" stroke-width="2"/>', pinyin:"/mv̩³³/", en:"Rain", cat:"nature" },
  { cn:"雪", svg:'<path d="M10 30 Q30 15 50 25 Q70 35 90 20" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="30" cy="55" r="4" fill="currentColor" opacity="0.6"/><circle cx="50" cy="60" r="5" fill="currentColor" opacity="0.5"/><circle cx="70" cy="50" r="4" fill="currentColor" opacity="0.6"/><circle cx="40" cy="75" r="3" fill="currentColor" opacity="0.4"/><circle cx="60" cy="78" r="4" fill="currentColor" opacity="0.4"/>', pinyin:"/bɯ³³/", en:"Snow", cat:"nature" },
  { cn:"云", svg:'<path d="M20 70 L40 30 L60 50 L80 20" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="80" x2="90" y2="80" stroke="currentColor" stroke-width="3"/>', pinyin:"/ŋv̩³³/", en:"Cloud", cat:"nature" },
  { cn:"天", svg:'<path d="M10 50 Q30 20 50 35 Q70 50 90 25" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="65" x2="90" y2="65" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/mɯ³³/", en:"Sky", cat:"nature" },
  { cn:"地", svg:'<rect x="15" y="40" width="70" height="40" fill="none" stroke="currentColor" stroke-width="3"/><line x1="15" y1="55" x2="85" y2="55" stroke="currentColor" stroke-width="2"/><line x1="15" y1="70" x2="85" y2="70" stroke="currentColor" stroke-width="2"/>', pinyin:"/dɯ³³/", en:"Earth", cat:"nature" },
  { cn:"树", svg:'<path d="M30 80 Q30 40 50 25 Q70 40 70 80" fill="none" stroke="currentColor" stroke-width="3"/><line x1="25" y1="55" x2="75" y2="55" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/sər⁵⁵/", en:"Tree", cat:"nature" },
  { cn:"花", svg:'<circle cx="50" cy="35" r="12" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="38" cy="45" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="62" cy="45" r="8" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="55" x2="50" y2="85" stroke="currentColor" stroke-width="3"/>', pinyin:"/bər³³/", en:"Flower", cat:"nature" },
  { cn:"草", svg:'<path d="M30 80 Q35 50 40 30" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M50 80 Q50 45 50 25" fill="none" stroke="currentColor" stroke-width="3"/><path d="M70 80 Q65 50 60 30" fill="none" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/tsər⁵⁵/", en:"Grass", cat:"nature" },
  // === 人物 ===
  { cn:"人", svg:'<circle cx="50" cy="22" r="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="34" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><line x1="30" y1="48" x2="70" y2="48" stroke="currentColor" stroke-width="3"/><line x1="35" y1="90" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><line x1="65" y1="90" x2="50" y2="65" stroke="currentColor" stroke-width="3"/>', pinyin:"/ɕi³³/", en:"Person", cat:"people" },
  { cn:"男", svg:'<circle cx="50" cy="22" r="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="34" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><line x1="30" y1="48" x2="70" y2="48" stroke="currentColor" stroke-width="3"/><line x1="35" y1="90" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><line x1="65" y1="90" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><circle cx="60" cy="20" r="4" fill="currentColor"/>', pinyin:"/zo³³/", en:"Man", cat:"people" },
  { cn:"女", svg:'<circle cx="50" cy="22" r="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="34" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><line x1="30" y1="48" x2="70" y2="48" stroke="currentColor" stroke-width="3"/><path d="M40 65 Q40 90 50 90 Q60 90 60 65" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/mi⁵⁵/", en:"Woman", cat:"people" },
  { cn:"头", svg:'<circle cx="50" cy="35" r="22" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="57" x2="50" y2="85" stroke="currentColor" stroke-width="3"/>', pinyin:"/kʰv̩³³/", en:"Head", cat:"people" },
  { cn:"眼", svg:'<ellipse cx="50" cy="50" rx="25" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="8" fill="currentColor"/>', pinyin:"/miɜ³³/", en:"Eye", cat:"people" },
  { cn:"手", svg:'<path d="M50 15 L50 50 M30 30 L50 40 L70 30" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="50" x2="35" y2="75" stroke="currentColor" stroke-width="3"/><line x1="50" y1="50" x2="65" y2="75" stroke="currentColor" stroke-width="3"/>', pinyin:"/la⁵⁵/", en:"Hand", cat:"people" },
  { cn:"心", svg:'<path d="M20 30 Q50 10 80 30 Q80 60 50 80 Q20 60 20 30" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/ɲi³³/", en:"Heart", cat:"people" },
  { cn:"口", svg:'<ellipse cx="50" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" stroke-width="2"/>', pinyin:"/kʰu³³/", en:"Mouth", cat:"people" },
  { cn:"耳", svg:'<path d="M30 25 Q15 50 30 75 Q45 75 45 50 Q45 25 30 25" fill="none" stroke="currentColor" stroke-width="3"/><path d="M55 25 Q40 50 55 75 Q70 75 70 50 Q70 25 55 25" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/nər³³/", en:"Ear", cat:"people" },
  // === 动物 ===
  { cn:"鸟", svg:'<path d="M30 20 Q70 20 70 50 Q70 80 50 80 Q30 80 30 60 Q30 40 50 40 Q65 40 65 55" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/ŋv̩³³/", en:"Bird", cat:"animal" },
  { cn:"马", svg:'<path d="M20 60 Q30 30 50 25 Q70 30 75 50" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="25" x2="55" y2="15" stroke="currentColor" stroke-width="2.5"/><line x1="40" y1="55" x2="40" y2="80" stroke="currentColor" stroke-width="3"/><line x1="60" y1="55" x2="60" y2="80" stroke="currentColor" stroke-width="3"/>', pinyin:"/zua³³/", en:"Horse", cat:"animal" },
  { cn:"牛", svg:'<path d="M20 30 L20 70 L80 70 L80 30" fill="none" stroke="currentColor" stroke-width="3"/><line x1="30" y1="30" x2="30" y2="15" stroke="currentColor" stroke-width="3"/><line x1="70" y1="30" x2="70" y2="15" stroke="currentColor" stroke-width="3"/><circle cx="35" cy="50" r="3" fill="currentColor"/>', pinyin:"/ŋv̩ʴ⁵⁵/", en:"Cow", cat:"animal" },
  { cn:"羊", svg:'<path d="M30 70 Q30 30 50 20 Q70 30 70 70" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="40" cy="35" r="3" fill="currentColor"/><circle cx="60" cy="35" r="3" fill="currentColor"/>', pinyin:"/tsʰo⁵⁵/", en:"Sheep", cat:"animal" },
  { cn:"鱼", svg:'<ellipse cx="50" cy="50" rx="30" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><path d="M80 50 L95 35 L95 65 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="35" cy="45" r="3" fill="currentColor"/>', pinyin:"/ŋv̩³³/", en:"Fish", cat:"animal" },
  { cn:"蛇", svg:'<path d="M15 50 Q30 20 50 40 Q70 60 85 30" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="15" cy="50" r="4" fill="currentColor"/>', pinyin:"/dʑi³³/", en:"Snake", cat:"animal" },
  { cn:"龙", svg:'<path d="M15 50 Q30 20 50 35 Q70 50 85 30" fill="none" stroke="currentColor" stroke-width="3"/><path d="M15 50 Q30 70 50 55 Q70 40 85 60" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="10" cy="50" r="6" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="48" r="2" fill="currentColor"/>', pinyin:"/lv̩²¹/", en:"Dragon", cat:"animal" },
  { cn:"虎", svg:'<path d="M25 25 L50 15 L75 25 L75 65 L50 80 L25 65 Z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="15" x2="50" y2="80" stroke="currentColor" stroke-width="2"/><line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" stroke-width="2"/>', pinyin:"/la⁵⁵/", en:"Tiger", cat:"animal" },
  { cn:"鸡", svg:'<circle cx="50" cy="35" r="15" fill="none" stroke="currentColor" stroke-width="3"/><path d="M45 20 L50 8 L55 20" fill="none" stroke="currentColor" stroke-width="2.5"/><line x1="50" y1="50" x2="50" y2="75" stroke="currentColor" stroke-width="3"/><line x1="40" y1="75" x2="60" y2="75" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/xɑ³³/", en:"Chicken", cat:"animal" },
  { cn:"狗", svg:'<path d="M20 70 L20 30 L50 20 L80 30 L80 70" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="35" cy="45" r="3" fill="currentColor"/><path d="M20 30 L10 20" stroke="currentColor" stroke-width="2.5"/><path d="M80 30 L90 20" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/kʰɯ³³/", en:"Dog", cat:"animal" },
  // === 物品 ===
  { cn:"家", svg:'<rect x="20" y="30" width="60" height="50" fill="none" stroke="currentColor" stroke-width="4"/><path d="M35 30 L35 15 L65 15 L65 30" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="30" x2="50" y2="15" stroke="currentColor" stroke-width="2"/>', pinyin:"/dʑi³³/", en:"Home", cat:"object" },
  { cn:"门", svg:'<path d="M30 80 L30 40 Q30 20 50 20 Q70 20 70 40 L70 80" fill="none" stroke="currentColor" stroke-width="3"/><line x1="30" y1="55" x2="70" y2="55" stroke="currentColor" stroke-width="2"/>', pinyin:"/kʰɑ³³/", en:"Door", cat:"object" },
  { cn:"路", svg:'<line x1="10" y1="85" x2="90" y2="15" stroke="currentColor" stroke-width="3"/><line x1="25" y1="55" x2="35" y2="55" stroke="currentColor" stroke-width="2"/><line x1="50" y1="40" x2="60" y2="40" stroke="currentColor" stroke-width="2"/>', pinyin:"/dzɑ²¹/", en:"Road", cat:"object" },
  { cn:"鼓", svg:'<ellipse cx="50" cy="40" rx="25" ry="15" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="55" x2="50" y2="85" stroke="currentColor" stroke-width="4"/><line x1="35" y1="85" x2="65" y2="85" stroke="currentColor" stroke-width="3"/>', pinyin:"/kər⁵⁵/", en:"Drum", cat:"object" },
  { cn:"刀", svg:'<path d="M50 10 Q65 30 65 60 L50 70 L35 60 Q35 30 50 10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="70" x2="50" y2="90" stroke="currentColor" stroke-width="4"/>', pinyin:"/tʰɑ⁵⁵/", en:"Knife", cat:"object" },
  { cn:"弓", svg:'<path d="M30 20 Q10 50 30 80" fill="none" stroke="currentColor" stroke-width="3"/><line x1="30" y1="20" x2="30" y2="80" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/kər⁵⁵/", en:"Bow", cat:"object" },
  { cn:"船", svg:'<path d="M10 55 Q30 75 50 60 Q70 75 90 55" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="20" x2="50" y2="55" stroke="currentColor" stroke-width="2.5"/><path d="M50 25 L75 45 L50 55" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"/le³³/", en:"Boat", cat:"object" },
  { cn:"笔", svg:'<line x1="50" y1="10" x2="50" y2="80" stroke="currentColor" stroke-width="3"/><path d="M45 80 L50 90 L55 80" fill="currentColor"/>', pinyin:"/pʰi⁵⁵/", en:"Pen", cat:"object" },
  { cn:"书", svg:'<rect x="25" y="20" width="50" height="65" fill="none" stroke="currentColor" stroke-width="3"/><line x1="35" y1="35" x2="65" y2="35" stroke="currentColor" stroke-width="2"/><line x1="35" y1="48" x2="55" y2="48" stroke="currentColor" stroke-width="2"/><line x1="35" y1="61" x2="60" y2="61" stroke="currentColor" stroke-width="2"/>', pinyin:"/dʑi³³/", en:"Book", cat:"object" },
  // === 颜色 ===
  { cn:"黑", svg:'<rect x="20" y="20" width="60" height="60" fill="currentColor" opacity="0.8" rx="3"/>', pinyin:"/nɑ³³/", en:"Black", cat:"color" },
  { cn:"白", svg:'<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="3" rx="3"/>', pinyin:"/pʰər⁵⁵/", en:"White", cat:"color" },
  { cn:"红", svg:'<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="12" fill="currentColor" opacity="0.5"/>', pinyin:"/ŋɑ²¹/", en:"Red", cat:"color" },
  { cn:"蓝", svg:'<rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="3"/><line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" stroke-width="2"/><path d="M35 35 Q50 25 65 35" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"/ŋv̩³³/", en:"Blue", cat:"color" },
  // === 动词 ===
  { cn:"走", svg:'<circle cx="50" cy="22" r="10" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="32" x2="50" y2="60" stroke="currentColor" stroke-width="3"/><line x1="35" y1="85" x2="50" y2="60" stroke="currentColor" stroke-width="2.5"/><line x1="65" y1="85" x2="50" y2="60" stroke="currentColor" stroke-width="2.5"/><path d="M30 45 Q50 50 70 45" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"/ɕi³³/", en:"Walk", cat:"verb" },
  { cn:"吃", svg:'<ellipse cx="50" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><path d="M72 50 L85 40" stroke="currentColor" stroke-width="3"/><line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="2"/>', pinyin:"/dʑi³³/", en:"Eat", cat:"verb" },
  { cn:"喝", svg:'<path d="M30 25 L30 75 Q50 85 70 75 L70 25" fill="none" stroke="currentColor" stroke-width="3"/><path d="M70 35 Q85 45 70 60" fill="none" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/tʰi³³/", en:"Drink", cat:"verb" },
  { cn:"看", svg:'<ellipse cx="50" cy="50" rx="25" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="50" cy="50" r="3" fill="currentColor"/>', pinyin:"/bər³³/", en:"See", cat:"verb" },
  { cn:"说", svg:'<ellipse cx="50" cy="50" rx="22" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><path d="M72 45 L85 35" stroke="currentColor" stroke-width="2.5"/><path d="M72 55 L85 65" stroke="currentColor" stroke-width="2.5"/><path d="M75 50 L90 50" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/ɕi³³/", en:"Speak", cat:"verb" },
  { cn:"听", svg:'<path d="M35 25 Q15 50 35 75" fill="none" stroke="currentColor" stroke-width="3"/><path d="M65 25 Q85 50 65 75" fill="none" stroke="currentColor" stroke-width="3"/><line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" stroke-width="2"/>', pinyin:"/nər³³/", en:"Listen", cat:"verb" },
  { cn:"写", svg:'<line x1="20" y1="80" x2="80" y2="20" stroke="currentColor" stroke-width="3"/><path d="M75 20 L80 25 L72 28" fill="currentColor"/><line x1="20" y1="65" x2="50" y2="65" stroke="currentColor" stroke-width="2"/>', pinyin:"/ɕi³³/", en:"Write", cat:"verb" },
  { cn:"唱", svg:'<ellipse cx="50" cy="45" rx="22" ry="18" fill="none" stroke="currentColor" stroke-width="3"/><path d="M35 30 Q40 10 55 15" fill="none" stroke="currentColor" stroke-width="2"/><path d="M55 30 Q60 10 75 15" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="63" x2="50" y2="80" stroke="currentColor" stroke-width="3"/>', pinyin:"/kʰɑ³³/", en:"Sing", cat:"verb" },
  // === 数字 ===
  { cn:"一", svg:'<line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="4"/>', pinyin:"/dʑi³³/", en:"One", cat:"number" },
  { cn:"二", svg:'<line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="3"/><line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" stroke-width="3"/>', pinyin:"/ȵi³³/", en:"Two", cat:"number" },
  { cn:"三", svg:'<line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="3"/><line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="3"/>', pinyin:"/sɑ¹/", en:"Three", cat:"number" },
  { cn:"五", svg:'<line x1="20" y1="30" x2="80" y2="30" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="3"/><line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="3"/><line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" stroke-width="2"/>', pinyin:"/ŋua³³/", en:"Five", cat:"number" },
  { cn:"十", svg:'<line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="3"/>', pinyin:"/tsʰi⁵⁵/", en:"Ten", cat:"number" },
  { cn:"百", svg:'<line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="30" r="5" fill="currentColor"/>', pinyin:"/dzi²¹/", en:"Hundred", cat:"number" },
  // === 方位 ===
  { cn:"上", svg:'<path d="M50 20 L80 50 L65 50 L65 80 L35 80 L35 50 L20 50 Z" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/pv̩³³/", en:"Up", cat:"direction" },
  { cn:"下", svg:'<path d="M50 80 L80 50 L65 50 L65 20 L35 20 L35 50 L20 50 Z" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/mv̩³³/", en:"Down", cat:"direction" },
  { cn:"大", svg:'<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="2"/>', pinyin:"/dɑ³³/", en:"Big", cat:"adj" },
  { cn:"小", svg:'<rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/ɕi⁵⁵/", en:"Small", cat:"adj" },
  // === 常用双字词（优先匹配，避免歧义）===
  { cn:"太阳", svg:'<circle cx="50" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="8" x2="50" y2="2" stroke="currentColor" stroke-width="2.5"/><line x1="30" y1="14" x2="36" y2="20" stroke="currentColor" stroke-width="2.5"/><line x1="70" y1="14" x2="64" y2="20" stroke="currentColor" stroke-width="2.5"/>', pinyin:"/ni³³/", en:"Sun", cat:"nature" },
  { cn:"月亮", svg:'<path d="M25 20 Q75 20 75 50 Q75 80 50 80 Q25 80 25 55 Q25 35 50 35 Q70 35 70 50" fill="none" stroke="currentColor" stroke-width="3"/>', pinyin:"/le³³/", en:"Moon", cat:"nature" },
  { cn:"山水", svg:'<path d="M15 70 L50 20 L85 70 Z" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="78" x2="90" y2="78" stroke="currentColor" stroke-width="3"/><path d="M10 50 Q25 25 40 40 Q55 55 70 35 Q85 15 95 40" fill="none" stroke="currentColor" stroke-width="2.5"/>', pinyin:"-", en:"Landscape", cat:"nature" },
  { cn:"天下", svg:'<path d="M10 50 Q30 20 50 35 Q70 50 90 25" fill="none" stroke="currentColor" stroke-width="3"/><line x1="10" y1="65" x2="90" y2="65" stroke="currentColor" stroke-width="2.5"/><path d="M50 80 L80 50 L65 50 L65 20 L35 20 L35 50 L20 50 Z" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"-", en:"Under heaven", cat:"nature" },
  { cn:"大人", svg:'<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="3"/><line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="85" r="5" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"-", en:"Adult", cat:"people" },
  { cn:"小人", svg:'<rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3"/><circle cx="50" cy="85" r="4" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"-", en:"Child", cat:"people" },
  { cn:"人心", svg:'<circle cx="50" cy="22" r="12" fill="none" stroke="currentColor" stroke-width="3"/><line x1="50" y1="34" x2="50" y2="65" stroke="currentColor" stroke-width="3"/><line x1="30" y1="48" x2="70" y2="48" stroke="currentColor" stroke-width="3"/><path d="M20 30 Q50 10 80 30 Q80 60 50 80 Q20 60 20 30" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"-", en:"Human heart", cat:"people" },
  { cn:"山水人", svg:'<path d="M15 70 L50 20 L85 70 Z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M10 50 Q25 25 40 40 Q55 55 70 35 Q85 15 95 40" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="85" r="5" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"-", en:"Mountain water person", cat:"nature" },
  { cn:"火水", svg:'<path d="M25 80 Q35 50 50 20 Q65 50 75 80" fill="none" stroke="currentColor" stroke-width="3"/><path d="M10 50 Q25 25 40 40 Q55 55 70 35 Q85 15 95 40" fill="none" stroke="currentColor" stroke-width="2"/>', pinyin:"-", en:"Fire and water", cat:"nature" }
];

/* 转换函数：将中文文本分段匹配转换为东巴文 */
function convertToDongba(text) {
  if (!text || !text.trim()) return [];
  var results = [];
  var i = 0;
  var chars = Array.from(text);

  while (i < chars.length) {
    var matched = false;
    // Try longest match first (4 chars down to 1)
    for (var len = Math.min(4, chars.length - i); len >= 1; len--) {
      var word = chars.slice(i, i + len).join('');
      var entry = DONGBA_DB.find(function(d) { return d.cn === word; });
      if (entry) {
        results.push({ cn: word, svg: entry.svg, pinyin: entry.pinyin, en: entry.en, found: true });
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Skip punctuation and whitespace
      if (/[\s，。！？、；：""''（）\.\,\!\?\;\:\-\—\…]/.test(chars[i])) {
        results.push({ cn: chars[i], svg: '', pinyin: '', en: '', found: false, isPunct: true });
      } else {
        results.push({ cn: chars[i], svg: '', pinyin: '', en: '', found: false });
      }
      i++;
    }
  }
  return results;
}
