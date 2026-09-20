(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();

  // --- Chart 1: 六维评分权重构成（横向条形图） ---
  var elScore = document.getElementById('chart-score');
  if (elScore) {
    var chartScore = echarts.init(elScore, null, { renderer: 'svg' });
    chartScore.setOption({
      animation: false,
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true },
      grid: { left: 130, right: 60, top: 20, bottom: 36 },
      xAxis: {
        type: 'value',
        max: 30,
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule } }
      },
      yAxis: {
        type: 'category',
        inverse: true,
        data: ['内容真实度', '自主智能程度', '人设一致性', '产品完成度', '设计思路与亮点', '现场演示'],
        axisLabel: { color: ink, fontSize: 12 },
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false }
      },
      series: [{
        type: 'bar',
        data: [30, 20, 15, 15, 15, 5],
        barWidth: 22,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: function(params) {
            return params.dataIndex === 0 ? accent2 : accent;
          }
        },
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontWeight: 600,
          formatter: '{c} 分'
        }
      }]
    });
    window.addEventListener('resize', function() { chartScore.resize(); });
  }

  // --- Chart 2: L1/L2/L3 六维能力画像（雷达图，各维度满分归一化） ---
  var elRadar = document.getElementById('chart-radar');
  if (elRadar) {
    var chartRadar = echarts.init(elRadar, null, { renderer: 'svg' });
    chartRadar.setOption({
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true },
      legend: {
        bottom: 0,
        itemWidth: 14,
        itemHeight: 8,
        textStyle: { color: muted, fontSize: 12 }
      },
      radar: {
        indicator: [
          { name: '真实度\n(满分30)', max: 100 },
          { name: '自主性\n(满分20)', max: 100 },
          { name: '人设\n(满分15)', max: 100 },
          { name: '完成度\n(满分15)', max: 100 },
          { name: '设计\n(满分15)', max: 100 },
          { name: '演示\n(满分5)', max: 100 }
        ],
        radius: '62%',
        center: ['50%', '48%'],
        axisName: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule } },
        splitArea: { areaStyle: { color: ['rgba(109,90,230,0.02)', 'rgba(109,90,230,0.05)'] } },
        axisLine: { lineStyle: { color: rule } }
      },
      series: [{
        type: 'radar',
        data: [
          {
            name: 'L1 机械工程（典型 80 分）',
            value: [93, 40, 93, 93, 80, 80],
            lineStyle: { color: '#1F9D6B', width: 2 },
            itemStyle: { color: '#1F9D6B' },
            areaStyle: { color: 'rgba(31,157,107,0.12)' }
          },
          {
            name: 'L2 文档驱动（典型 82 分）',
            value: [83, 65, 87, 87, 87, 90],
            lineStyle: { color: accent, width: 2 },
            itemStyle: { color: accent },
            areaStyle: { color: 'rgba(109,90,230,0.12)' }
          },
          {
            name: 'L3 自主智能（典型 81 分）',
            value: [73, 90, 80, 73, 93, 80],
            lineStyle: { color: accent2, width: 2 },
            itemStyle: { color: accent2 },
            areaStyle: { color: 'rgba(239,90,116,0.12)' }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { chartRadar.resize(); });
  }
})();
