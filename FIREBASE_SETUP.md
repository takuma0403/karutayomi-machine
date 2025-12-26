# Firebase Hosting デプロイ完了 ✅

## デプロイ情報

**デプロイURL**: https://karutayomi-machine.web.app
**プロジェクトコンソール**: https://console.firebase.google.com/project/karutayomi-machine/overview

## GitHub Actions設定

`.github/workflows/firebase-deploy.yml` を作成しました。

**必要な設定**:
GitHubリポジトリと連携するために、以下のコマンドを実行してください:

```bash
pnpm firebase init hosting:github
```

このコマンドを実行すると:
1. GitHubリポジトリを選択
2. mainブランチへのpush時に自動デプロイするワークフローを設定
3. 必要なシークレット(`FIREBASE_SERVICE_ACCOUNT_KARUTAYOMI_MACHINE`)を自動的にGitHubに追加

## 手動デプロイ

今後、手動でデプロイする場合:

```bash
pnpm build
pnpm firebase deploy --only hosting
```

## 現在の状態

- ✅ karutayomi-machineプロジェクトにデプロイ成功
- ✅ GitHub Actionsワークフロー作成済み
- ⚠️ GitHub Actionsのシークレット設定が必要(`firebase init hosting:github`を実行)
