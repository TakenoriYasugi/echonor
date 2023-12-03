// 忍者AdMaxの広告を表示するコンポーネント。
// オリジナルのタグは以下の通り。
// <!-- admax -->
// <script src="https://adm.shinobi.jp/s/ea492f162cbda4ac8d8bf88a20cb6eb4"></script>
// <!-- admax -->
// これをReactで書き直す。

import React from "react";

const AdMax = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "admax"
  }, /*#__PURE__*/React.createElement("script", {
    src: "https://adm.shinobi.jp/s/ea492f162cbda4ac8d8bf88a20cb6eb4"
  }));
};

export default AdMax;