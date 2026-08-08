# デザイントークン実測

## 実際に使われているブレークポイント(出現回数付き)

- 480px ×18
- 768px ×18

> 出現回数が多い値がサイト固有の境界。少数のものは Squarespace/Wix 等のフレームワークが
> 積んでいる汎用クエリのことが多い。**どの境界で本当にレイアウトが変わるかは、
> その前後の幅で実測して確かめる**(例: 767/768 と 991/992)。

## 色(使用頻度順)

### 文字色
- `rgb(51, 51, 51)` ×1692
- `rgb(0, 0, 0)` ×960
- `rgb(17, 17, 17)` ×831
- `rgb(255, 255, 255)` ×453
- `rgb(0, 53, 113)` ×108
- `rgb(244, 255, 245)` ×33
- `rgb(34, 34, 34)` ×33
- `rgb(154, 54, 50)` ×18
- `rgb(0, 124, 255)` ×18
- `rgba(51, 51, 51, 0.6)` ×9
- `rgb(170, 170, 170)` ×9
- `rgb(17, 92, 241)` ×6
- `rgb(189, 189, 189)` ×6

### 背景色
- `rgb(255, 255, 255)` ×177
- `rgb(17, 17, 17)` ×90
- `rgb(248, 247, 246)` ×57
- `rgb(0, 53, 113)` ×39
- `rgb(242, 58, 60)` ×18
- `rgb(170, 170, 170)` ×12
- `rgb(0, 17, 35)` ×4
- `rgb(154, 54, 50)` ×3
- `rgb(161, 161, 161)` ×3
- `rgb(0, 12, 27)` ×2
- `rgb(0, 7, 14)` ×2
- `rgb(0, 52, 111)` ×2
- `rgb(0, 51, 109)` ×1
- `rgb(0, 19, 41)` ×1
- `rgb(0, 5, 11)` ×1
- `rgb(0, 22, 47)` ×1

> ここに出た色だけを使う。**アクセントカラーを勝手に足さない**。

## フォント

- `sans-serif` ×1602
- `Lato` ×978
- `"Times New Roman"` ×960
- `Montserrat, "Noto Sans JP"` ×360
- `"Material Icons"` ×153
- `Montserrat` ×72
- `"Noto Sans JP"` ×33
- `"Material Symbols Outlined"` ×18

## フォントサイズ

### ビューポート別ルート値
- 1440x900: root=16px
- 768x1024: root=16px
- 390x844: root=16px

### 出現サイズ
- 16px ×1958
- 14px ×231
- 20px ×176
- 13px ×108
- 18px ×98
- 24px ×76
- 15px ×68
- 12px ×54
- 28px ×52
- 48px ×43
- 32px ×32
- 36px ×21
- 10px ×19
- 22px ×5
- 40px ×4
- 54px ×3
- 72px ×2
- 64px ×2

## :root のカスタムプロパティ

- `--g-position-9: 100%`
- `--g-position-10: 100%`
- `--g-position-8: 100%`
- `--g-color-5: rgba(0, 0, 0, 0)`
- `--rebranding-loading-bar: #222`
- `--s-color-d39282a5: #003571ff`
- `--g-color-0: rgba(0, 0, 0, 0)`
- `--g-color-9: rgba(0, 0, 0, 0)`
- `--g-position-1: 100%`
- `--g-position-4: 100%`
- `--g-color-4: rgba(0, 0, 0, 0)`
- `--g-angle: 180deg`
- `--g-color-1: rgba(0, 0, 0, 0)`
- `--g-color-10: rgba(0, 0, 0, 0)`
- `--g-color-7: rgba(0, 0, 0, 0)`
- `--s-color-f99dbcd0: #003571ff`
- `--g-color-3: rgba(0, 0, 0, 0)`
- `--s-color-9aba5843: #003571ff`
- `--g-color-8: rgba(0, 0, 0, 0)`
- `--g-position-3: 100%`
- `--s-color-e186ae7d: #003571ff`
- `--rebranding-loading-bg: #e5e5e5`
- `--s-color-85b0055c: #111111ff`
- `--s-color-fb9056f8: #111111ff`
- `--g-color-2: rgba(0, 0, 0, 0)`
- `--g-color-11: rgba(0, 0, 0, 0)`
- `--g-position-6: 100%`
- `--s-font-67adc24e: Lato`
- `--g-position-7: 100%`
- `--g-position-11: 100%`
- `--s-font-42ab0630: 'Noto Sans JP'`
- `--g-position-5: 100%`
- `--s-font-c29dd8c6: Inter, 'Noto Sans JP'`
- `--g-position-0: 0.01%`
- `--g-position-2: 100%`
- `--s-font-6d849a6a: 'Noto Sans JP'`
- `--s-font-ec900238: Montserrat`
- `--g-color-6: rgba(0, 0, 0, 0)`
