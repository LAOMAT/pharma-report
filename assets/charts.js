(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var accent4 = style.getPropertyValue('--accent4').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var warn = style.getPropertyValue('--warn').trim();

  // --- Chart 1: BD出海交易总额年度趋势 ---
  var chartBD = echarts.init(document.getElementById('chart-bd'), null, { renderer: 'svg' });
  chartBD.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      appendToBody: true,
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>BD交易总额: <b>' + p.value + '</b> 亿美元';
      }
    },
    grid: { left: 60, right: 30, top: 40, bottom: 50 },
    xAxis: {
      type: 'category',
      data: ['2022年', '2023年', '2024年', '2025年', '2026上半年'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '亿美元',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
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
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 13,
        fontWeight: 600,
        formatter: function(params) {
          if (params.dataIndex === 4) return '1100\n(半年)';
          return params.value;
        }
      },
      itemStyle: { borderRadius: [4, 4, 0, 0] }
    }]
  });
  window.addEventListener('resize', function() { chartBD.resize(); });

  // --- Chart 2: 2026年6-7月创新药板块反弹节奏 ---
  var chartRhythm = echarts.init(document.getElementById('chart-rhythm'), null, { renderer: 'svg' });

  var dates = [
    '6/18', '6/19', '6/20', '6/23', '6/24', '6/25', '6/26',
    '6/27', '6/29', '6/30',
    '7/1', '7/2', '7/3',
    '7/7', '7/8', '7/9', '7/10',
    '7/11', '7/13', '7/14', '7/15'
  ];
  var priceIndex = [
    100.0, 101.5, 102.0, 100.8, 101.2, 100.5, 102.0,
    104.5, 113.4, 116.0,
    122.0, 125.5, 119.0,
    114.5, 117.0, 119.5, 126.0,
    122.5, 131.0, 129.5, 135.0
  ];

  var markPoints = [
    {
      name: '五连涨启动',
      coord: ['6/18', 100.0],
      itemStyle: { color: accent3 },
      label: { color: ink, fontSize: 10, formatter: '五连涨\\n启动', offset: [0, -22] }
    },
    {
      name: '医保目录初审',
      coord: ['6/29', 113.4],
      itemStyle: { color: accent2 },
      label: { color: ink, fontSize: 10, formatter: '医保目录\\n初审公示', offset: [0, -22] }
    },
    {
      name: '政策文件发布',
      coord: ['7/1', 122.0],
      itemStyle: { color: accent2 },
      label: { color: ink, fontSize: 10, formatter: '支持创新药\\n若干措施', offset: [0, -22] }
    },
    {
      name: '回调',
      coord: ['7/7', 114.5],
      itemStyle: { color: warn },
      label: { color: warn, fontSize: 10, formatter: '量化\\n回调-4%+', offset: [0, -22] }
    },
    {
      name: '基药目录修订',
      coord: ['7/13', 131.0],
      itemStyle: { color: accent2 },
      label: { color: ink, fontSize: 10, formatter: '基药目录\\n八年首修', offset: [0, -22] }
    }
  ];

  chartRhythm.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      appendToBody: true,
      formatter: function(params) {
        var p = params[0];
        return p.name + '<br/>板块指数: <b>' + p.value.toFixed(1) + '</b>';
      }
    },
    grid: { left: 55, right: 30, top: 50, bottom: 45 },
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 10, rotate: 35 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      min: 95,
      max: 140,
      axisLine: { show: false },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [{
      type: 'line',
      data: priceIndex,
      smooth: false,
      symbol: 'circle',
      symbolSize: 5,
      lineStyle: { color: accent, width: 2.5 },
      itemStyle: { color: accent },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: accent + '30' },
            { offset: 1, color: accent + '00' }
          ]
        }
      },
      markPoint: {
        symbol: 'pin',
        symbolSize: 38,
        data: markPoints
      },
      markLine: {
        silent: true,
        symbol: 'none',
        lineStyle: { color: rule, type: 'dashed', width: 1 },
        data: [
          { yAxis: 100, label: { formatter: '基准线 100', color: muted, fontSize: 10, position: 'insideEndTop' } }
        ]
      }
    }]
  });
  window.addEventListener('resize', function() { chartRhythm.resize(); });

  // --- Chart 3: 传统时代 vs AI量化时代 市场周期特征对比 (Radar) ---
  var chartCompare = echarts.init(document.getElementById('chart-compare'), null, { renderer: 'svg' });
  chartCompare.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      appendToBody: true
    },
    legend: {
      data: ['传统时代 (2019)', 'AI量化时代 (2026)'],
      bottom: 0,
      textStyle: { color: muted, fontSize: 12 },
      itemGap: 20
    },
    radar: {
      indicator: [
        { name: '日内振幅', max: 10 },
        { name: '趋势持续天数', max: 50 },
        { name: '信息定价速度', max: 10 },
        { name: '回调频次', max: 10 },
        { name: '资金轮动速度', max: 10 },
        { name: '散户胜率', max: 10 }
      ],
      center: ['50%', '52%'],
      radius: '65%',
      splitNumber: 5,
      axisName: {
        color: ink,
        fontSize: 12
      },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: ['transparent', bg2] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [4, 12, 3, 3, 3, 6],
          name: '传统时代 (2019)',
          lineStyle: { color: accent, width: 2 },
          itemStyle: { color: accent },
          areaStyle: { color: accent + '20' }
        },
        {
          value: [8, 47, 9, 8, 9, 3],
          name: 'AI量化时代 (2026)',
          lineStyle: { color: accent2, width: 2 },
          itemStyle: { color: accent2 },
          areaStyle: { color: accent2 + '20' }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { chartCompare.resize(); });

  // --- Chart 4: 历史周期 vs AI加速修正 三阶段时间轴对比 ---
  var chartTimeline = echarts.init(document.getElementById('chart-timeline'), null, { renderer: 'svg' });

  chartTimeline.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: bg2,
      borderColor: rule,
      textStyle: { color: ink },
      appendToBody: true,
      formatter: function(params) {
        var result = params[0].name + '<br/>';
        params.forEach(function(p) {
          result += p.marker + ' ' + p.seriesName + ': ' + p.value + ' 个月<br/>';
        });
        return result;
      }
    },
    legend: {
      data: ['历史参照 (2019-2021)', 'AI加速修正 (2026-2027E)'],
      bottom: 0,
      textStyle: { color: muted, fontSize: 12 },
      itemGap: 20
    },
    grid: { left: 70, right: 30, top: 40, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['第一阶段：估值修复', '第二阶段：业绩主升', '第三阶段：情绪扩散'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, interval: 0 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '持续时间（月）',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '历史参照 (2019-2021)',
        type: 'bar',
        data: [12, 12, 6],
        barWidth: '30%',
        itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] },
        label: {
          show: true,
          position: 'top',
          color: ink,
          fontSize: 12,
          fontWeight: 600,
          formatter: function(params) {
            return params.value + '月';
          }
        }
      },
      {
        name: 'AI加速修正 (2026-2027E)',
        type: 'bar',
        data: [3.5, 7, 3.5],
        barWidth: '30%',
        itemStyle: { color: accent2, borderRadius: [4, 4, 0, 0] },
        label: {
          show: true,
          position: 'top',
          color: accent2,
          fontSize: 12,
          fontWeight: 600,
          formatter: function(params) {
            return params.value + '月';
          }
        }
      }
    ]
  });
  window.addEventListener('resize', function() { chartTimeline.resize(); });

})();
