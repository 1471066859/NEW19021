// 通过当前路由地址改变顶部面包屑展示内容
export function pageHeader() {
  const {
    path
  } = this.$route;
  switch (path) {
    case '/page/BoxAdmin':
      return '料盒管理系统'
      break;

    case '/page/Materials':
      return '仓储管理系统'
      break;
    case '/page/ProductAdmin':
      return '仓储管理系统'
      break;

    case '/page/ProAdmin':
      return '产线管理系统'
      break;

    case '/page/AllOrder':
      return '订单管理系统'
      break;

    case '/page/ErrorOrder':
      return '订单管理系统'
      break;

    case '/page/ProingOrder':
      return '订单管理系统'
      break;

    case '/page/CarryOrder':
      return '订单管理系统'
      break;

    case '/page/AwatOrder':
      return '订单管理系统'
      break;

    case '/page/UserInfo':
      return '后台管理'
      break;

    case '/page/Chart':
      return '报表系统'
      break;

    case '/page/ProReportR':
      return '生产报表系统'
      break;

    case '/page/ProReportZ':
      return '生产报表系统'
      break;

    case '/page/ProReportY':
      return '生产报表系统'
      break;

    case '/page/ProReportJ':
      return '生产报表系统'
      break;

    case '/page/ProReportN':
      return '生产报表系统'
      break;
    case '/page/StuffChart':
      return '原材料报表系统'
      break;
    case '/page/StuffReportR':
      return '原材料报表系统'
      break;
    case '/page/StuffReportZ':
      return '原材料报表系统'
      break;
    case '/page/StuffReportY':
      return '原材料报表系统'
      break;
    case '/page/StuffReportJ':
      return '原材料报表系统'
      break;
    case '/page/StuffReportN':
      return '原材料报表系统'
      break;
    case '/page/OrderQuality':
      return '质量管理系统'
      break;
    case '/page/StuffQuality':
      return '质量管理系统'
      break;

    default:
      break;
  }
}
export function pageRouterBox() {
  const {
    path
  } = this.$route;
  switch (path) {
    case '/page/BoxAdmin':
      return '料盒出入库管理'
      break;

    case '/page/Materials':
      return '物料出入库管理'
      break;
    case '/page/ProductAdmin':
      return '成品出入库管理'
      break;

    case '/page/ProAdmin':
      return '产线管理'
      break;

    case '/page/AllOrder':
      return '全部订单'
      break;

    case '/page/ErrorOrder':
      return '异常订单'
      break;

    case '/page/ProingOrder':
      return '正在生产订单'
      break;

    case '/page/CarryOrder':
      return '完成生产订单'
      break;

    case '/page/AwatOrder':
      return '等待生产订单'
      break;
    case '/page/UserInfo':
      return '账号管理'
      break;

    case '/page/Chart':
      return '生产报表总览'

      break;
    case '/page/ProReportR':
      return '日生产报表'

      break;
    case '/page/ProReportZ':
      return '周生产报表'

      break;
    case '/page/ProReportY':
      return '月生产报表'

      break;
    case '/page/ProReportJ':
      return '季生产报表'

      break;
    case '/page/ProReportN':
      return '年生产报表'

    case '/page/StuffChart':
      return '原材料报表总览'

    case '/page/StuffReportR':
      return '日原材料报表'
      break;
    case '/page/StuffReportZ':
      return '周原材料报表'
      break;
    case '/page/StuffReportY':
      return '月原材料报表'
      break;
    case '/page/StuffReportJ':
      return '季原材料报表'
      break;
    case '/page/StuffReportN':
      return '年原材料报表'
      break;
    case '/page/OrderQuality':
      return '成品质量管理'
      break;
    case '/page/StuffQuality':
      return '原材料质量管理'
      break;

    default:
      break;
  }
}