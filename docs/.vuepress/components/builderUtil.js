/**
 * Derived from: https://github.com/kidonng/swiss/blob/86acf884494fe2b5a36548b3ec5e0d603e414b0f/src/views/substats-badge-creator/utils.ts
 * Original implementation is in Typescript
 *
 * Another version is available at: https://swiss.vercel.app/substats-badge-creator
 * Thanks @kidonng !
 */

export const logos = {
  bilibili:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAD7ElEQVR4nO2dW9WrMBCFK6ESkFAJSKiESqgEHCABCZWAhEpAAhL2ecik5dDc/pXLBDLfWnlqy0xmJ5BMQnq5CIIgCIIgCIIgCIIgCEIBAHQAemYfrgCunD6wAKAHsEKxALgx bCQD8/S9tmgVqeDr1lLigDgZvDhXso K9TyTBQRwRJ8AHjntl0Flh5QRAQK/mKxPeayWx2OXpBNBKiHvi34b7T2MC4pAvW6twR/RwkRKPizBN8CgEcuESj4Lwm BwBjahEk H8EwJRKhOaCDzW8e1JLfkUUH1NgmR3XmHffHR1l 72BSs8d7w8U JDAnZERQMcV CtUi7dNqFqibB4J7vtrq7xKCuAasbTMXCL4T 5aVk6 2xHUrWdhruAR6HIJcOeu2UHI8zyAe2ytWfEdWz9PVvQ8YAmIQ5dDAB9LFsMVAv8oMO2zAGrC5WNIarRiAuKR9jYEd9pY08aa6uUzIHGRdkgKd8pY0yc1WjEBAqypDYoAG0QAZkQAZkQAZkQAZk4vANQenjsSzS3I/wcSbXU5jQBUkRtdf4Rar90v8kSv3 I3ffCCSpk8I/w lgDkdI/v2rEp2CaiWm1AsDQLlDAD dlFXLMeAaCSeLZdaSFE5VUQNot38cKuEeBgAsSuG0flVZBmEanbXfNQAsS0fgBYIn2fIu3/BBMHEyBmDXlFfA8IzeHb Ems4WAChKykrVA9ZfsQTL57jXzRg4A5wC/A8N4ADiZAZwm2XjW75Qh2KOTfA0p4kygPw28OJcCVgn3nDnYo2EwEYRgGH0qAMyICMCMCMCMCMCMCMCMCMCMCfP3qwHDOQ4AAUekTk8FaBRihJnZdYbvtCGC7LvmkM63GjVDINPFrQgCq5ETXfmMzI90FXzPvfqt7x4rEu/ZaEcCUxFvgz2zO BUn6UkoaEEAsptiMSX5e8FoRYCN7cVgb4Vq7U/H50Pq4JNP7Qiw8UFnJwcK tXy Wj6PLEvPgHSHv5UgwA1IQIwwyFAyLJin9RoxYgAzAQIkPwNmf26busC OIx5TDqo5nDT F/SS/9CYzwb No49zNy2evkYv0LywGGAXUvp6eSneycqOic0w20k7CNgKE7jJunSGLACTCxF27ylmQc98T5MQUH49swd I0HPXslLKnT0N wnkrTKi9JZL/L9i1SorMmdeQ4TQQ7OFMxIMzGD45w8nUL1im7efENZLJpgPSw0pfz0cdt4U3230Td/Tvx2R6d2FrHhEWLkq5PELOMsRPHCPnAZGv1xJteL7jbJiaW3sB2nDvPC/osSYvjRQz4cJ6n7KO3rYQL7M L6nVtfDVRAEQRAEQRAEQRAEIZ5/SAXmdfXaoQsAAAAASUVORK5CYII=',
  coolapk:
    'data:image/svg xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiPjxkZWZzPjxzdHlsZS8 PC9kZWZzPjxwYXRoIGQ9Ik0xMjcuODkzIDQyNi42NjdjMjkuOTItNjYuOTg3IDk0LjUwNy0xMTYuNjk0IDE2Ni40LTEzMC4zNDcgNTUuNzg3LTkuNiAxMTIuOTYgNS4wNjcgMTYxLjkyIDMxLjk0N0M0OTcuNzYgMzQ5LjQ0IDUzNC40IDM3OC44OCA1NjcuOTQ3IDQxMS4wNGMtMTYuMTYgMTguNC0zOS4wOTQgMjguODUzLTU3LjQ5NCA0NC43NDctNDYuMTMzLTM4Ljg4LTk2LjY0LTc3LjcwNy0xNTcuOTczLTg3LjA5NC03OC45MzMtMTMuMTczLTE1OC41NiA0OS4yMjctMTcwLjUwNyAxMjcuMTQ3LTguNjkzIDQ1LjkyIDEwLjEzNCA5NC42NjcgNDUuMTc0IDEyNC45MDcgMzkuNjggMzQuOTg2IDk3LjIyNiA0NC41ODYgMTQ3LjYyNiAzMS4yNTMgNTcuNi0xMy45MiAxMDEuOTc0LTU3LjA2NyAxMzYuODU0LTEwMi43NzMgNTQuMDgtNzIuMTA3IDk5LjItMTUwLjQgMTQ3Ljg0LTIyNi4xMzQgMTMuOTItMTkuMTQ2IDQ3LjQxMy0xNy4yMjYgNTguNzIgMy44NCA2My42MjYgMTA5LjAxNCAxMjYuMDggMjE4LjcyIDE4OS42IDMyNy43ODcgNy41NzMgMTUuMDkzIDQuNDI2IDM1Ljc4Ny05LjYgNDYuMTMzLTEzLjA2NyAxMC42MTQtMzMuMzM0IDEwLjI0LTQ2LjEzNC0uNjkzYTk3MDY2LjU1OCA5NzA2Ni41NTggMCAwMS0yMjYuMTg2LTE2Mi43MmMxOC44OC0xNS4wNCAzOC40LTI5LjMzMyA1Ny45NzMtNDMuNDY3IDIzLjczMyAxMi45MDcgNDMuNzg3IDMzLjE3NCA2OS42IDQxLjY1NC0yMC4zNzMtMzkuNTc0LTQzLjYyNy03Ny43MDctNjYuMzQ3LTExNS45NDctNDIuNjY2IDU5LjE0Ny03Ny4wNjYgMTI0LjIxMy0xMjMuMTQ2IDE4MS4wNjdDNTE2IDY2My40NjcgNDQ4LjggNzE2Ljk2IDM2OC42NCA3MjguNDhjLTM4Ljg4IDMuNDEzLTc5LjMwNyA0LjIxMy0xMTYuMzczLTkuOTczLTUzLjQ5NC0xOS4xNDctMTAwLjMyLTU4LjcyLTEyNC41ODctMTEwLjU2LTI4LjIxMy01Ni4xMDctMjYuNzczLTEyNS4wMTQuMjEzLTE4MS4yOHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
  feedsPub:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iOTYiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iOTYiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSI5NiIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249Ijk2IgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDgt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',
  inoreader:
    'data:image/svg xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI PHBhdGggZD0iTTM2IDBjMTkuODgyIDAgMzYgMTYuMTE4IDM2IDM2UzU1Ljg4MiA3MiAzNiA3MiAwIDU1Ljg4MiAwIDM2IDE2LjExOCAwIDM2IDB6bS03Ljk5IDMwLjk4QzIwLjgyNSAzMC45OCAxNSAzNi44MDQgMTUgNDMuOTkgMTUgNTEuMTc1IDIwLjgyNSA1NyAyOC4wMSA1N2M3LjE4MyAwIDEzLjAwOS01LjgyNSAxMy4wMDktMTMuMDExIDAtNy4xODUtNS44MjYtMTMuMDA5LTEzLjAwOS0xMy4wMDl6bTMuNjcgNS41NjVhMy43MjcgMy43MjcgMCAxMS0uMDA1IDcuNDU0IDMuNzI3IDMuNzI3IDAgMDEuMDA0LTcuNDU0em0tMy42Ny0xNC43NTh2NC42ODdjOS42NTYgMCAxNy41MTYgNy44NTggMTcuNTE2IDE3LjUxNWg0LjY4OWMwLTEyLjI0Mi05Ljk2MS0yMi4yMDItMjIuMjA1LTIyLjIwMnptMC05Ljc4N3Y0LjY4N2M3LjI5MiAwIDE0LjE0OCAyLjg0IDE5LjMwNiA3Ljk5OCA1LjE1OCA1LjE1NyA3Ljk5NSAxMi4wMTQgNy45OTUgMTkuMzA0SDYwYzAtOC41NDQtMy4zMjgtMTYuNTc3LTkuMzctMjIuNjJDNDQuNTg1IDE1LjMyNiAzNi41NTQgMTIgMjguMDEgMTJ6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4=',
  jike:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAEsmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIKICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgdGlmZjpJbWFnZUxlbmd0aD0iMjAiCiAgIHRpZmY6SW1hZ2VXaWR0aD0iMjAiCiAgIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiCiAgIHRpZmY6WFJlc29sdXRpb249IjcyLjAiCiAgIHRpZmY6WVJlc29sdXRpb249IjcyLjAiCiAgIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMCIKICAgZXhpZjpQaXhlbFlEaW1lbnNpb249IjIwIgogICBleGlmOkNvbG9yU3BhY2U9IjEiCiAgIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiCiAgIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiCiAgIHhtcDpNZXRhZGF0YURhdGU9IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJwcm9kdWNlZCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWZmaW5pdHkgRGVzaWduZXIgMS44LjMiCiAgICAgIHN0RXZ0OndoZW49IjIwMjAtMDYtMTNUMDA6MzI6MjErMDg6MDAiLz4KICAgIDwvcmRmOlNlcT4KICAgPC94bXBNTTpIaXN0b3J5PgogIDwvcmRmOkRlc2NyaXB0aW9uPgogPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0iciI/PgLfemYAAAGCaUNDUHNSR0IgSUVDNjE5NjYtMi4xAAAokXWRu0sDQRCHPxM1opGIWliIBIlWKjFC0MYi4gvUIongq0kuLyGP4y5Bgq1gKyiINr4K/Qu0FawFQVEEsbKwVrTRcM4lQoKYWWbn29/uDLuzYAkmlZRe64ZUOqv5J33OhcUlp 2Feuy00EVrSNHV2cBEkKr2eU NGW/7zVrVz/1rTZGorkBNg/CoompZ4SnhmbWsavKOcLuSCEWEz4T7NLmg8J2ph0v8anK8xN8ma0H/GFhahJ3xCg5XsJLQUsLyclypZE75vY/5Ens0PR Q2C3eiY6fSXw4mWacMbwMMiKzl348DMiKKvnuYv4cGclVZFbJo7FKnARZ kTNSfWoxJjoURlJ8mb///ZVjw15StXtPqh7Noz3HrBtQ2HLML6ODKNwDNYnuEyX8zOHMPwh lZZcx2AYwPOr8paeBcuNqHjUQ1poaJkFbfEYvB2Cs2L0HYDjculnv3uc/IAwXX5qmvY24deOe9Y QFEC2fWKEm0kwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAdZJREFUOI2llLFrU1EUh7/zXmLSFpIsUrDgYiFbBsGhTsFR6qjimsVd s90KYib4uxasDgILnXJowrWYHEQadLaoeSdn8NLX26S9zTogwv3Xn5897vnPK4B6GujiVkP7CmwiVnMMp UAp9Au0h7dnM0tAlsH4s6QLQUaAGMIz8EdSPMev8JAxGhqIOsZxq0 pi1/xGUjXytxDRojf9as/o2VG8BcPrzFa34pASqtLJUA1YfwsoDAPaSuzxbf7xoByCLK8tdLc2Xv9LGrFkAlaAcGIbxfNvQdDnJKJgvAjUbntnLVaZ7mstVwlw5zALDAFJwaGWxsEXBad9KYTPAMjMBVoX4OgCXqZPKshqWiFSCes8W2 pQ68DqfajdBuDgW8qanU4hc83JDEvMFK9jG2 Y9JWTc flkbPdfFd 5dww/JeuApfHnF8M HJxg/ffnY8/xmzVX3Bv5Xmh2dXc9Lk1RhZr7iSAg7NHvD17wka1z9baazZrHzCp2A6QlJqOWn1h7SJ9YbjHxIwLG7BQJimJsscRR0y7l srg4WAuUwwHLRrShpNl 0bUSd718rr8wc7d/mhS93I2qNhZOoi35ErkSvFA5PQaM5OrlSuRPiOS91rd0bD31iIPlmy3nObAAAAAElFTkSuQmCC',
  newsblur:
    'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAb/QAAG/0Bl9EHNgAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAAVdEVYdENyZWF0aW9uIFRpbWUAMy8xMS8xMcNHd9UAAAagSURBVFiFxZdLbFTXGcd/597xeOzBb2Ns8/ADY2oHHCkE2w0kEAckGtFYROqiVqsuKrXKphur6qLNpknVRcWmWUStIqFUFWlVqZEbxKZgkcYQAn0RjE0wntjBLvYUD34wjzv3nu90MXfGM/iRqBu 0dGcc 653/9//t93z0MZY3iSZj1RdCCQrSilNh0Y/VNffrMVOPXYkPeBSLZR963hTf1llVe5ygYE5s4ezVZPAr8CKvIeT/r/u/P6loAfA cA6gcu/f8EZt99ATKzHQaCSDpktBMy4gWN0XbNcy8BmtiVi6CUVlZRWtnFKazSFJAG oDI9u/9bUMCG bAvXcOI678UlwZEcfZ4sVjdV5ipUo7Xom42EaKCFS3EKhuRiSAcY0tTqpEJ2JVOj5bJ058i7gyIq4M3nvn8EYw6ysw9fZzAG8D/UbHy432wqAwqBzn6t4TlOxoATxSM58Ru3oBhQAa0Jm6XRrHrloGhoDXml 78uUKRN7qRTwZFE/6aw91f1y 79mwmABaW4i20NpCa5vQjqcxhIFSQjs6Ea3QGkQrjFYYY1G2Z2u44XjTJfGkXzwZjLzVu7kCE6e7IRPzESRRHm5rC1d3vwSUoNOwcG2Y NQ44eYOwrv2kl58AAgl9Q3Ep0Z5dOcGW5p3UtnVTrDcQpEg/sUs0ZFIHKtiGTgMRPYMXltfAe0K2pVhnXaC2nHCy7cngCIMQaxgGVsP9xOs2c6jyG0Ss9MYMRhRrEzeZfn2OMGaBmoPv0hReRUQwGATHRlDnJWwTieD2pVh7UqBArl1YOzNZxBPTgJBTLzSGAXikZybJ1TfjnaSTJ39NbW9x2j8xnfXSLn16y yNP4xk2d R8vAKQLFFunFBF7S9YO WGnU1jRwcuzNZ85l38sp4M/  9p1Qjqtbe2C5yoWR28AFnfPnKZ54EdUdBxYAw5gsKjoeJrmge9w98wfMFgs/P0O4pIpaW1rNxnSrvwkX4WcAuIagB6FEzKA8X Ln93GWX6XukMnsItL1gXPN7u4mLpDPUz/eZjk/TkKVhedCgnB/EVrVQFxpVVcQVw3aFyDcQ1KFLUHeknOzlC1/9lNgRUaEECo2t9O4ot5KjuaQCDrT9x0MIMhrWsU0K50AliWZ2MXsfPlo5S3d5KKOSQfLH7JvD3AQ GRXQe2tO2kdEc1jX1tLN2Z4975mxitbS0C0Im/b SFQPYCk1/7YV9Dcc02DKUYXHR8ieLKcjIra3AdcI3C8Z 7KFzAo7gyjBNdgvZqKtrrqWivx1mIc s3tyaBvfh7Rb4CALWpaIzimmrfWZrE/BxGPBRJQGMIkImc8cFdwEGRKiAh4vlhWbVkdAXtSm1 X74Cl4HByT9eB/tf1D /j4ajBylvrmXqgys0vNCNwUNhQy61tC97Oo9ERo1UdJGypkoA/nNpgrmPIhgtiFdRAVxeQ0C7Es3UlFaea89c JSZC6NUdbWyPDkDJFAEIEfAkEm6bOydHAmFw4N/zyCi XxoNDdbg6V9paPZvtxXYMREjBiMttPGAEZjjCZ2Y5K67t3MXryMIr5OSQBxFEkfPMXMxVG27Kpm4cZ9jGG1aDudWT1NZA0B34ZE7FS2oRBq9jfS8koX0Ss3iY2OA4/8EveBsyQSKBLERqeZHZ6g8we91OxvKHDu x7K73ucwGkjRSmMlcue p5GFHEOvH6CqfcvM3vxeoECWWBFgpmLY0y8908O/Ow4AM39 1Y9G0sbKUoBp/MBC3bDDwdaAT5Slu6wA4kaZVt0//xEAcOpv4wx/8kUZU3VlO uBQzLkwusTMfY1tNE8ytPFYz/xxt/xUu5aK90wYg9Djx/5GwktxsGWGvHjNifG10U39bTGM52ekmXqaFRFm7eZ3vfHmq6VuWt6Wpg4dP7zA5PkJhbYefxdspaqgFoObWfO7 /GTdip4Fjj4OtORH5KpwEfnvw9e5LD8fmvj19fhyjC7fRnl 8XND 5KfnCx3bFo1HdlN3cNd719 4dhR4Fbh65Gwm/zY9lOaTsO1UubLdMI9Z8zefYltvEwDzV6eZ uDWGimNLoprHVp HDyfwLqHUn/gOeBVrUPL2itdyE9MgOnz4 vWM94trb3ShY3A823DU7H/wlWgxYg97rnhqPZCD40UJTGWNlqIjc4RG53LhCeT5UnthR56bjjqJ1zLZuDwFS4mfjgA2oBBoD/v8XoXkyEyn9rdvImssa98M1qHCGRuR1vJHDIBRoD/krkVsRnwhgSelD3x2/H/ABaTkvTEe2p7AAAAAElFTkSuQmCC',
  neteaseMusic:
    'data:image/svg xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iOTYiIGhlaWdodD0iOTYiPjxkZWZzPjxzdHlsZS8 PC9kZWZzPjxwYXRoIGQ9Ik02MjcuMDg2IDUuMTE1YzI4LjEzMi03LjY3MiA1OC44MjItNy42NzIgODYuOTUzIDAgMzMuMjQ3IDcuNjcyIDYzLjkzNyAyMy4wMTcgODkuNTEyIDQzLjQ3NyAxMC4yMyA3LjY3MyAxNy45MDIgMTUuMzQ0IDIzLjAxNyAyOC4xMzEgNy42NzIgMTcuOTAzIDUuMTE0IDM4LjM2My01LjExNSA1My43MDgtNy42NzIgMTIuNzg3LTIzLjAxNyAyMy4wMTctNDAuOTIgMjUuNTc0LTEyLjc4NyAyLjU1OC0yNS41NzQgMC0zOC4zNjItNy42NzItNS4xMTUtMi41NTgtMTAuMjMtMTAuMjMtMTcuOTAyLTEyLjc4Ny0xNy45MDItMTAuMjMtMzUuODA0LTIwLjQ2LTU2LjI2NC0xNy45MDMtMTUuMzQ1IDAtMjguMTMyIDcuNjczLTM1LjgwNCAxNy45MDMtMTAuMjMgMTAuMjMtMTIuNzg4IDIzLjAxNy0xMC4yMyAzNS44MDQgNy42NzIgMjUuNTc0IDEyLjc4NyA1My43MDYgMjAuNDYgNzkuMjgxIDUxLjE1IDIuNTU4IDk5Ljc0IDE1LjM0NSAxNDMuMjE4IDQwLjkyIDQwLjkyIDI1LjU3NSA3OS4yOCA1OC44MjEgMTA5Ljk3IDk3LjE4MyAyNS41NzUgMzMuMjQ3IDQ2LjAzNSA3MS42MSA1Ni4yNjUgMTEyLjUzIDEyLjc4NiA0My40NzYgMTcuOTAxIDg5LjUxIDEyLjc4NiAxMzIuOTg2LTIuNTU3IDM4LjM2My0xMC4yMyA3NC4xNjYtMjMuMDE2IDEwOS45NzEtMzMuMjQ3IDg0LjM5Ni05Mi4wNyAxNjEuMTItMTcxLjM1IDIwOS43MTMtNTYuMjY1IDM1LjgwMy0xMjIuNzYgNTguODIxLTE4OS4yNTMgNjYuNDkzLTQ2LjAzNCA1LjExNS05Mi4wNjkgNS4xMTUtMTM4LjEwMi0yLjU1Ny05NC42MjctMTUuMzQ1LTE4MS41OC02MS4zOC0yNTAuNjMxLTEzMC40MzEtNjYuNDk1LTY2LjQ5My0xMTIuNTMtMTUzLjQ0OC0xMzIuOTktMjQ1LjUxNi03LjY3MS02OS4wNTItNy42NzEtMTM4LjEwMyA3LjY3My0yMDcuMTU0IDE3LjkwMy04MS44NCA2MS4zOC0xNjEuMTIgMTE3LjY0NC0yMjIuNSA0OC41OTItNTEuMTUgMTA3LjQxNC04OS41MTEgMTcxLjM1LTExNy42NDMgNy42NzItMi41NTggMTIuNzg3LTUuMTE1IDIwLjQ2LTcuNjczIDE1LjM0NC0yLjU1NyAzMC42OSAwIDQzLjQ3NyAxMC4yMyAxNy45MDIgMTIuNzg4IDI1LjU3NCAzMy4yNDggMjMuMDE3IDUzLjcwNy0yLjU1NyAyMC40Ni0xNy45MDIgMzguMzYzLTM1LjgwNSA0Ni4wMzQtNjMuOTM3IDI1LjU3NS0xMjIuNzU4IDY5LjA1Mi0xNjMuNjc4IDEyMi43Ni0zOC4zNjIgNTMuNzA1LTYzLjkzNiAxMTIuNTI3LTcxLjYwOCAxNzMuOTA2LTcuNjcyIDYxLjM4IDAgMTIyLjc1OCAyMC40NiAxODEuNTggMzAuNjkgODQuMzk2IDk0LjYyNiAxNTYuMDA0IDE3My45MDcgMTk2LjkyNCA0OC41OTIgMjUuNTc1IDEwMi4yOTggMzguMzYyIDE1Ni4wMDUgMzguMzYyIDQzLjQ3NyAwIDg5LjUxMS03LjY3MiAxMzAuNDMtMjMuMDE3IDM1LjgwNS0xMi43ODcgNzEuNjEtMzMuMjQ3IDk5Ljc0MS01OC44MjIgMjguMTMzLTIzLjAxNiA1MS4xNS01My43MDYgNjYuNDk1LTg0LjM5NiA3LjY3Mi0xNS4zNDUgMTcuOTAxLTMzLjI0NyAyMC40Ni01MS4xNSAxNS4zNDQtNTEuMTQ5IDE3LjkwMS0xMDcuNDEzIDIuNTU2LTE1OC41NjEtMTIuNzg2LTQzLjQ3OC0zOC4zNjEtODEuODQtNzEuNjA5LTEwOS45NzEtMTUuMzQ0LTEyLjc4Ny0zMC42OS0yNS41NzUtNDguNTkyLTM1LjgwNS0xNS4zNDQtNy42NzItMzAuNjktMTUuMzQ1LTQ4LjU5MS0xNy45MDIgMTIuNzg4IDQ2LjAzNCAyMy4wMTggOTIuMDcgMzUuODA0IDEzNS41NDUgMi41NTggMTAuMjMgNS4xMTUgMjMuMDE4IDUuMTE1IDMzLjI0OCAyLjU1OCA0Ni4wMzMtMTUuMzQ0IDk0LjYyNS00Ni4wMzQgMTMwLjQzLTI4LjEzMiAzMy4yNDYtNjkuMDUyIDU4LjgyMS0xMTIuNTI4IDY2LjQ5NC00Ni4wMzQgMTAuMjMtOTcuMTg0IDAtMTM4LjEwMy0yNS41NzUtMzguMzYyLTI1LjU3NC02Ni40OTQtNjMuOTM2LTgxLjg0LTEwNC44NTYtNy42NzItMjMuMDE3LTEyLjc4Ny00OC41OTEtMTIuNzg3LTc0LjE2Ni0yLjU1Ni01Ni4yNjQgMTIuNzg4LTEwOS45NzEgNDMuNDc4LTE1Ni4wMDUgMzUuODA0LTUzLjcwNyA5NC42MjUtOTIuMDcgMTU4LjU2Mi0xMDkuOTcxLTUuMTE1LTE3LjkwMi0xMC4yMy0zNS44MDUtMTIuNzg3LTUzLjcwNy0xMi43ODctMzguMzYxLTEwLjIzLTgxLjgzOSA3LjY3Mi0xMTUuMDg2IDEwLjIzLTIwLjQ2IDIzLjAxOC0zOC4zNjEgNDAuOTItNTEuMTUgMjMuMDE2LTIwLjQ2IDQzLjQ3Ni0zMy4yNDYgNjYuNDk0LTQwLjkxOE00NzguNzUzIDQxOS40MjRjLTE3LjkwMyAxNy45MDItMjguMTMzIDQwLjkyLTMzLjI0NyA2My45MzYtNS4xMTQgMjAuNDYtNS4xMTQgNDMuNDc3IDAgNjYuNDk1IDUuMTE0IDIzLjAxNiAxNy45MDIgNDYuMDMzIDM4LjM2MiA2MS4zOCAxNS4zNDUgMTAuMjI4IDM1LjgwNCAxNS4zNDMgNTYuMjY0IDEwLjIyOCAzNS44MDQtNS4xMTUgNjMuOTM2LTM4LjM2MiA2My45MzYtNzQuMTY2LTIuNTU3LTcuNjcyLTIuNTU3LTE3LjkwMi01LjExNS0yNS41NzUtMTIuNzg3LTQ4LjU5Mi0yNS41NzMtOTkuNzQxLTM4LjM2MS0xNDguMzMzLTMwLjY5IDcuNjczLTU4LjgyMiAyMy4wMTgtODEuODQgNDYuMDM1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
  sspai:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAF0klEQVR4nO1dvW7jOBD2I7gkh426pHS127pIeiN5AdsvsH4CIw8gwL1dpHaV0mWqu1aNLCrAAkbWwAKBYTiCcTBwgMEr/HN7e5aoH5JDS/qAAVIEtvV9nBlySI4ajRo1atSoIYPnOM05Y605Y60AoBMAdDhhXU5Y9/A3aXNC2nPGWti/9erhOU4zAOiElI04pa8hBS ksOEURAZbhBReQspGnLCu5zhN7OeyFp7jNDkh7TmBp5CCl5HojKKwUQDQwX5mK8AJaYeUjXKMbiV28A7SxubBKE6jXfNIzygEeJywLjY3WvFvXLeH MoIYduITyNEKfKE5zjNw0wGn9RcBvDMCXGwecyF46hHSa6q7eq8IaB0UBbyzyJQOsDmVYqrDzkSCym8YHMciwP58IJNkgERPOtW1XPGWpzCApscgyJsrKk5Hef2pYr3qQ17FT1nrFVZ8o G5gme4zR5hcJOnIUUNsbXClVJuBlE8IwKUOapZgERzExRA0oH2A9rq2lfrFV6xpNWBF1li2Pcr8mXmLakXMf9TCKozQeckDb2Q m0t5tbsbi7F8teX6xcV3xOp Lnt0Ghz1QWig7zffqKTZJqoj GQ7EeT8TO98U isQlFBEhpLBRIgAnrItNnG6i47CdzYr9FhXbmzZvJaoiWpcAhb0gAOhgk2yC6DjsfL/47y/iBaZjPxbRcViPJ4WfKbcXHGv8lSD6EvZRJN4fHtU8c56y9ZzAk0rS3x8excp1rSP6Ena L5a9vrpBB/CciXzVpebtbIbNaSz2USR2vi8 p1PxMRyKxd29co/PHIZUJt9lr4/N8f9wGuGLu3vxdnOrnPDLYShDMuYAz6q  HM6NUruPorE3z9 JP6PiuSawwvSlyeuIfz8GjpWriveHx7PI3pxd2 jAOnCECfEUfnFqgTY f5/iE76ThsF4BREqiqp6sXXejxRIkAW0mwVINWGjcr4f4mMU jYzmZi5brnZKiStO9fvlopQKo8oGuz/URy3KxDJWmyz1q5LooAnNJXuQcgHTWpggCpEjHOyKiGAJyCSDxXqrP Y5MAH8MhmgCJdSHMrUeVAsgSei1ApQVIKElgbj qFOD94dFaARLXArUAtQDVFgBzD7gqAiTmgLIIINuDQPWApANbZZkFyQTAXIjJBFBairZVgM/pFE2AxHXAcS 49AIUPvFWTAAnVoBGoxzFuLebWysFSFmMwzmIq7qGn3T0RcmJt3wCyO SYd0DUC3AzvdjP2sfRSgCpDofhLUYUy2AbCtUx/kfmc0JPEkFwErEqgX4 W2Q Hkoa4G0V5c4QiJWLYAsEZsOQ5lOx2HkAR0b6bIjMUWvIWUUIP3BLIyShA4BZGHIpBdkvjNm kqqDgFkYciUF4QUNpl7DJkOQ7rO8sjOpprwglzXVk1v0OsSII0X6C7O5b6yyg3OhmQCFLkwsXJdqQjfv3zV9WyLXOQ3GmYXZUkC7KOoEEFvN7fSI u6KqSpFl82eEFSqFARImQV0qIix43 wg3 THlBnADb2UzZLRbZukD16rjw6DftBb/OWPZRJNbjifIrRH/98WesAIqnpMVH/1kAg1uVy15fLHt9rXe3lr2 WI8nYjubie1sJtbjiborqUdT3jeo7hGX3rS0L8Pcrrwm09rUtex9g5SY7hdA1E374i2kbKSV/BPqfHDBAJ6NNvW2uY QaUPpqF53UTyTj9dJHfNKkw0WUtigv96kqjOjQ39QS155VbU29laM/N9xzAmlT8yHl71Z/Gqrck9R6at174 5BNXtzmywkLLRVZB/QlmSs1XJNis8x2mq7r5i1uir1fE LY7esMAnNLUtrnbUJ FYyLNWiJDCJqB0cFWxPg8sFGJRCeJ/RwDQwcoRIYVNSOFlzlircsRfwkkMnSvqE mcsG5NegI4IU5A6eDgHfnurB3J9kIKL3MCT9a8 /GawQlpBwCdAKDDCesGlA7OBtDhhLTrkFKjRo0aqfEPTet8XSy2Km4AAAAASUVORK5CYII=',
}

// https://substats.spencerwoo.com/api.html
export const sources = {
  feedly: {
    category: 'RSS',
    title: 'Feedly',
    logo: 'feedly',
    logoColor: 'white',
    label: 'Feedly RSS',
    labelColor: '2bb24c',
    suffix: ' subscribers',
    color: '282c34',
    link: queryKey => queryKey,
  },
  feedsPub: {
    category: 'RSS',
    title: 'Feeds Pub',
    logo: logos.feedsPub,
    label: 'Feeds Pub',
    labelColor: '282c34',
    suffix: ' subscribers',
    color: '61b04b',
    link: queryKey => queryKey,
  },
  inoreader: {
    category: 'RSS',
    title: 'Inoreader',
    logo: logos.inoreader,
    label: 'Inoreader RSS',
    labelColor: '007bc7',
    suffix: ' subscribers',
    color: '282c34',
    link: queryKey => queryKey,
  },
  newsblur: {
    category: 'RSS',
    title: 'NewsBlur',
    logo: logos.newsblur,
    label: 'NewsBlur RSS',
    labelColor: '282c34',
    suffix: ' subscribers',
    color: 'de922e',
    link: queryKey => queryKey,
  },
  jikeFollower: {
    category: 'Social Media',
    title: 'Jike (followers)',
    logo: logos.jike,
    label: '即刻 被关注',
    labelColor: '282c34',
    color: 'f7cf07',
    link: queryKey => `https://m.okjike.com/users/${queryKey}`,
  },
  jikeHighlights: {
    category: 'Social Media',
    title: 'Jike (highlights)',
    logo: logos.jike,
    label: '即刻 精选',
    labelColor: '282c34',
    color: 'f7cf07',
    link: queryKey => `https://m.okjike.com/users/${queryKey}`,
  },
  jikeLiked: {
    category: 'Social Media',
    title: 'Jike (likes)',
    logo: logos.jike,
    label: '即刻 获赞',
    labelColor: '282c34',
    color: 'f7cf07',
    link: queryKey => `https://m.okjike.com/users/${queryKey}`,
  },
  bilibili: {
    category: 'Social Media',
    title: 'Bilibili',
    logo: logos.bilibili,
    label: 'bilibili fans',
    labelColor: 'FE7398',
    color: '282c34',
    link: queryKey => `https://space.bilibili.com/${queryKey}`,
  },
  coolapk: {
    category: 'Social Media',
    title: 'Coolapk',
    logo: logos.coolapk,
    label: '酷安 Coolapk',
    labelColor: '11ab60',
    suffix: ' fans',
    color: '282c34',
    link: queryKey => `https://www.coolapk.com/u/${queryKey}`,
  },
  instagram: {
    category: 'Social Media',
    title: 'Instagram',
    logo: 'instagram',
    logoColor: 'white',
    label: 'Instagram',
    labelColor: 'd7417b',
    suffix: ' followers',
    color: '282c34',
    link: queryKey => `https://www.instagram.com/${queryKey}`,
  },
  telegram: {
    category: 'Social Media',
    title: 'Telegram',
    logo: 'telegram',
    label: queryKey => `@${queryKey}`,
    labelColor: '282c34',
    suffix: ' members',
    color: '2CA5E0',
    link: queryKey => `https://t.me/${queryKey}`,
  },
  twitter: {
    category: 'Social Media',
    title: 'Twitter',
    logo: 'twitter',
    label: 'Twitter',
    labelColor: '282c34',
    suffix: ' followers',
    color: '1da1f2',
    link: queryKey => `https://twitter.com/${queryKey}`,
  },
  weibo: {
    category: 'Social Media',
    title: 'Weibo',
    logo: 'sina-weibo',
    label: '微博关注',
    labelColor: 'e71f19',
    color: '040000',
    link: queryKey => `https://weibo.com/u/${queryKey}`,
  },
  github: {
    category: 'Developers',
    title: 'GitHub',
    logo: 'github',
    label: 'GitHub Followers',
    labelColor: '282c34',
    color: '181717',
    link: queryKey => `https://github.com/${queryKey}`,
  },
  neteaseMusic: {
    category: 'Music',
    title: 'Netease Music',
    logo: logos.neteaseMusic,
    label: '网易云音乐粉丝',
    labelColor: 'e72d2c',
    color: '282c34',
    link: queryKey => `https://music.163.com/#/user/home?id=${queryKey}`,
  },
  steamGames: {
    category: 'Games',
    title: 'Steam (games)',
    logo: 'steam',
    label: 'Steam',
    labelColor: '134375',
    suffix: ' Games',
    color: '0b1a37',
    link: queryKey => `https://steamcommunity.com/profiles/${queryKey}/`,
  },
  steamFriends: {
    category: 'Games',
    title: 'Steam (friends)',
    logo: 'steam',
    label: 'Steam Friends',
    labelColor: '134375',
    color: '0b1a37',
    link: queryKey => `https://steamcommunity.com/profiles/${queryKey}/`,
  },
  unsplash: {
    category: 'Photography',
    title: 'Unsplash',
    logo: 'unsplash',
    label: 'Unsplash',
    labelColor: '000000',
    suffix: ' followers',
    color: '282c34',
    link: queryKey => `https://unsplash.com/@${queryKey}`,
  },
  afdianFans: {
    category: 'Websites',
    title: 'Aifadian (sponsors)',
    label: '爱发电',
    labelColor: '946ce6',
    suffix: ' 发电人次 / 月',
    color: '282c34',
    link: queryKey => `https://afdian.net/@${queryKey}`,
  },
  afdianIncome: {
    category: 'Websites',
    title: 'Aifadian (income)',
    label: '爱发电收入',
    labelColor: '946ce6',
    prefix: '￥ ',
    suffix: ' 每月',
    color: '282c34',
    link: queryKey => `https://afdian.net/@${queryKey}`,
  },
  medium: {
    category: 'Websites',
    title: 'Medium',
    logo: 'medium',
    label: 'Medium',
    labelColor: '03a87c',
    suffix: ' followers',
    color: '12100E',
    link: queryKey => `https://medium.com/${queryKey}`,
  },
  reddit: {
    category: 'Websites',
    title: 'Reddit',
    logo: 'reddit',
    logoColor: 'white',
    label: 'Reddit Karma',
    labelColor: 'FF4500',
    color: '282c34',
    link: queryKey => `https://www.reddit.com/user/${queryKey}`,
  },
  sspai: {
    category: 'Websites',
    title: 'sspai',
    logo: logos.sspai,
    label: '少数派关注',
    labelColor: '282c34',
    color: 'd71a1b',
    link: queryKey => `https://sspai.com/u/${queryKey}`,
  },
  zhihu: {
    category: 'Websites',
    title: 'Zhihu',
    label: '知乎关注',
    labelColor: '0084ff',
    color: '282c34',
    link: queryKey => `https://www.zhihu.com/people/${queryKey}`,
  },
}

export const badge = (source, queryKey) => {
  const { title, logo, logoColor, label, labelColor, prefix, suffix, color, link: _link } = sources[source]

  const apiBase = new URL('https://api.spencerwoo.com/substats/')
  apiBase.search = new URLSearchParams({
    source,
    queryKey,
  }).toString()
  const api = apiBase.toString()

  const imageBase = new URL('https://img.shields.io/badge/dynamic/json')
  imageBase.search = new URLSearchParams({
    ...(logo ? { logo } : {}),
    ...(logoColor ? { logoColor } : {}),
    label: typeof label === 'function' ? label(queryKey) : label,
    labelColor,
    ...(prefix ? { prefix } : {}),
    ...(suffix ? { suffix } : {}),
    color,
    query: '$.data.totalSubs',
    url: api,
    longCache: 'true',
  }).toString()
  const image = imageBase.toString()
  const link = _link(queryKey)

  // `split` to drop category
  const markdown = `[![${title}](${image})](${link})`

  return { api, image, link, markdown }
}
