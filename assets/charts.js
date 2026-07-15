document.addEventListener('DOMContentLoaded', function() {
  // Check if ECharts is loaded
  if (typeof echarts === 'undefined') {
    console.error('ECharts library not loaded. Charts will not render.');
    return;
  }

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: BD出海交易总额年度趋势 ---
  var chartBDElem = document.getElementById('chart-bd');
  if (chartBDElem) {
    var chartBD = echarts.init(chartBDElem, null, { renderer: 'svg' });
    chartBD.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        backgroundColor: bg2, borderColor: rule, textStyle: { color: ink }, appendToBody: true,
        formatter: function(params) { var p = params[0]; return p.name + '<br/>BD交易总额: <b>' + p.value + '</b> 亿美元'; }
      },
      grid: { left: 60, right: 30, top: 40, bottom: 50 },
      xAxis: {
        type: 'category', data: ['2022年', '2023年', '2024年', '2025年', '2026上半年'],
        axisLine: { lineStyle: { color: rule } }, axisLabel: { color: muted, fontSize: 12 }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: '亿美元', nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [{
        type: 'bar',
        data: [
          { value: 280, itemStyle: { color: muted } },
          { value: 470, itemStyle: { color: muted } },
          { value: 520, itemStyle: { color: accent + '99' } },
          { value: 1300, itemStyle: { color: accent2 } },
          { value: 1100, itemStyle: { color: accent, opacity: 0.85 } }
        ],
        barWidth: '45%',
        label: { show: true, position: 'top', color: ink, fontSize: 13, fontWeight: 600,
          formatter: function(params) { return params.dataIndex === 4 ? '1100\n(半年)' : params.value; }
        },
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      }]
    });
    window.addEventListener('resize', function() { chartBD.resize(); });
  }

  // --- Chart 2: 历史周期 vs AI加速修正 三阶段时间对比 ---
  var chartTLElem = document.getElementById('chart-timeline');
  if (chartTLElem) {
    var chartTimeline = echarts.init(chartTLElem, null, { renderer: 'svg' });
    chartTimeline.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        backgroundColor: bg2, borderColor: rule, textStyle: { color: ink }, appendToBody: true,
        formatter: function(params) {
          var result = params[0].name + '<br/>';
          params.forEach(function(p) { result += p.marker + ' ' + p.seriesName + ': ' + p.value + ' 个月<br/>'; });
          return result;
        }
      },
      legend: {
        data: ['历史参照 (2019-2021)', 'AI加速修正 (2026-2027E)'],
        bottom: 0, textStyle: { color: muted, fontSize: 12 }, itemGap: 20
      },
      grid: { left: 70, right: 30, top: 40, bottom: 60 },
      xAxis: {
        type: 'category', data: ['第一阶段：估值修复', '第二阶段：业绩主升', '第三阶段：情绪扩散'],
        axisLine: { lineStyle: { color: rule } }, axisLabel: { color: muted, fontSize: 11, interval: 0 }, axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: '持续时间（月）', nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [
        {
          name: '历史参照 (2019-2021)', type: 'bar', data: [12, 12, 6], barWidth: '30%',
          itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: ink, fontSize: 12, fontWeight: 600, formatter: function(p) { return p.value + '月'; } }
        },
        {
          name: 'AI加速修正 (2026-2027E)', type: 'bar', data: [2, 4.5, 2.5], barWidth: '30%',
          itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] },
          label: { show: true, position: 'top', color: accent2, fontSize: 12, fontWeight: 600, formatter: function(p) { return p.value + '月'; } }
        }
      ]
    });
    window.addEventListener('resize', function() { chartTimeline.resize(); });
  }
});
