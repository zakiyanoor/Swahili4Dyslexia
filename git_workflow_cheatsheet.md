
# 🧠 Git Workflow Cheat Sheet: Swahili4Dyslexia Project

This guide is for working smoothly with branches (`main`, `dev`, `dev2`) using rebase-based collaboration.

---

## ✅ Before You Start Coding

```bash
git checkout dev2       # switch to your working branch
git sync-start          # pulls latest from main and rebases
```

> This ensures you’re working on the most recent codebase.

---

## ✅ After You Finish Coding

```bash
git sync-push
```

You’ll be prompted for a commit message. This will:
1. Add and commit your code
2. Pull from `main` with rebase
3. Push your changes to your current branch

---

## 🔁 Summary Commands

| Task                | Command         |
|---------------------|-----------------|
| Start working       | `git sync-start`|
| Save & push work    | `git sync-push` |

---

## 🧩 Bonus Tips

- Run `git status` often to see your branch and file status
- Never code without `sync-start` — you might miss other people's work
- Avoid `git merge` unless you're doing a final integration

Happy coding!
