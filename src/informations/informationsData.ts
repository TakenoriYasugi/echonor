export type InformationsData = {date: string, type: InformationsType, content: string};
export enum InformationsType {
    Info = "Info",
    Bug = "Bug",
    Maintenance = "Maintenance",
    Update = "Update",
    Other = "Other",
}

export const informationsData: InformationsData[] = [
    {date: "2023/11/30 15:00", type: InformationsType.Update, content: "お知らせ欄を作成しました。画面上部のアイコンから表示できます。"},
    {date: "2023/11/30 02:00", type: InformationsType.Update, content: "サポートへのリンクを作成しました。メニューの「サポート」から表示できます。"},
    {date: "2023/11/30 16:30", type: InformationsType.Info, content: "今後の更新予定です。①無限スクロールの実装(過去の投稿の非同期取得) ②検索機能 ③集会場"},
    {date: "2023/11/30 18:58", type: InformationsType.Maintenance, content: "特定の条件下でお知らせ欄のバッヂが表示されない不具合を修正しました。"},
    {date: "2023/12/02 13:11", type: InformationsType.Update, content: "ゲストログイン機能を追加しました。未ログインの状態でもタイムラインの閲覧ができるようになりました。その他の操作にはログインが必要です。"},
    {date: "2023/12/02 19:25", type: InformationsType.Update, content: "検索機能を実装しました。画面下部のアイコンから表示できます。"},
    {date: "2023/12/02 22:43", type: InformationsType.Update, content: "アプリのアイコンを変更しました。"},
    {date: "2023/12/02 23:23", type: InformationsType.Update, content: "検索結果が0件の場合に表示されるメッセージを変更しました。"},
    {date: "2023/12/03 21:17", type: InformationsType.Info, content: "現在広告掲載の実験中です。突然広告が表示されることがありますのでご了承ください。"},
];