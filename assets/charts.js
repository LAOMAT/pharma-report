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

  // --- Chart 3: 走势节奏预判图 ---
  var chartRhythmElem = document.getElementById('chart-rhythm');
  if (chartRhythmElem) {
    var chartRhythm = echarts.init(chartRhythmElem, null, { renderer: 'svg' });
    chartRhythm.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'line' },
        backgroundColor: bg2, borderColor: rule, textStyle: { color: ink }, appendToBody: true,
        formatter: function(params) {
          var p = params[0];
          return p.name + '<br/>指数点位: <b>' + p.value + '</b>（基准=100）';
        }
      },
      legend: {
        data: ['预测走势路径'],
        bottom: 0, textStyle: { color: muted, fontSize: 12 }
      },
      grid: { left: 60, right: 40, top: 50, bottom: 60 },
      xAxis: {
        type: 'category',
        data: ['7月上','7月下','8月上','8月下','9月上','9月下','10月上','10月下','11月上','11月下','12月上','12月下','1月上','1月下','2月','3月','4月','5月','6月'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 10, interval: 0, rotate: 35 },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value', name: '指数（基准=100）', nameTextStyle: { color: muted, fontSize: 11 },
        min: 90, max: 190,
        axisLine: { show: false }, axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [{
        name: '预测走势路径', type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
        data: [100, 106, 110, 105, 118, 122, 112, 128, 136, 130, 148, 142, 152, 155, 148, 145, 162, 175, 178],
        lineStyle: { color: accent, width: 2.5, type: 'dashed' },
        itemStyle: { color: accent },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent + '33' },
              { offset: 1, color: accent + '05' }
            ]
          }
        },
        markArea: {
          silent: true,
          data: [
            [{ name: '子浪3-1\n中枢突破', xAxis: '7月上', itemStyle: { color: accent + '15' } }, { xAxis: '9月上' }],
            [{ name: '子浪3-3\n主升浪', xAxis: '9月下', itemStyle: { color: accent2 + '15' } }, { xAxis: '2月' }],
            [{ name: '子浪3-5\n冲顶', xAxis: '3月', itemStyle: { color: '#56d36415' } }, { xAxis: '6月' }]
          ],
          label: { color: muted, fontSize: 10, position: 'insideTop' }
        },
        markPoint: {
          symbol: 'pin', symbolSize: 45,
          label: { color: '#fff', fontSize: 9 },
          itemStyle: { color: '#f85149' },
          data: [
            { name: '3-2回调', coord: ['8月下', 105], value: '-5%', itemStyle: { color: '#f0883e' } },
            { name: '3-4回调', coord: ['10月上', 112], value: '-8%', itemStyle: { color: '#f0883e' } },
            { name: '3-4回调', coord: ['11月下', 130], value: '-4.4%', itemStyle: { color: '#f0883e' } },
            { name: '3-4回调', coord: ['12月下', 142], value: '-4%', itemStyle: { color: '#f0883e' } },
            { name: '春节回调', coord: ['3月', 145], value: '-6.5%', itemStyle: { color: '#f0883e' } },
            { name: '见顶', coord: ['6月', 178], value: '+78%', itemStyle: { color: '#f85149' } }
          ]
        },
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: '#f85149', type: 'dotted', width: 1.5 },
          label: { color: '#f85149', fontSize: 10, position: 'insideEndTop' },
          data: [
            { yAxis: 100, name: '基准线' },
            { yAxis: 124, name: '中枢上沿', lineStyle: { color: '#f0883e', type: 'dashed', width: 1 }, label: { color: '#f0883e' } }
          ]
        }
      }]
    });
    window.addEventListener('resize', function() { chartRhythm.resize(); });
  }
});
