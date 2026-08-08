// Page copy, transcribed character-for-character from the live DOM.
//
// NOTE: the live site contains U+2FA7 KANGXI RADICAL LONG where 長 (U+9577) belongs —
// 6 occurrences across /service (5) and /about (1). It renders subtly differently and
// breaks text search. It is a defect in the source copy, so per the clone rules it is
// REPRODUCED here, not corrected, and raised as decision B in docs/clone-plan.md.
const CHO = "⾧"; // the broken 長

export const home = {
  title: "保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社",
  hero: {
    // The live H1 holds four spans: two shown above 768px, two below. The desktop pair
    // ends in "。", the mobile pair does not. Reproduced exactly.
    lineDesktop: ["保険代理店のこれからを", "一緒に考える。"],
    lineMobile: ["保険代理店のこれからを", "一緒に考える"],
    lead:
      "現場の声を起点に、代理店の皆様とともに次の未来を拓きます。<br>アシガルコンサルティングは、日本初の保険代理店向け M&amp;A マッチング支援を中核に据えた独立系コンサルティング会社です。",
    image: "/images/5cbd866b2a9d.webp",
  },
  about: {
    en: "About Us",
    ja: "私たちについて",
    heading: "私たちの原点<br>(創業の想い・ストーリー)",
    body: [
      "私たちの創業の原点は、とある代理店の方から頂いた「そういうことをメーカーの社員は全然教えてくれへんのや」という言葉でした。",
      "現場で多くの代理店の方々と向き合う中で、保険業界には&ldquo;構造的な限界&rdquo;があると感じました。<br>メーカー主導の仕組みや制度では解決できない悩みに寄り添う存在が、この業界には足りていない――。<br>この気づきが私たちが独立系コンサルティング会社として歩み始めた理由です。",
      "M&amp;Aマッチング支援や経営顧問サービスを通じて、皆様の未来をともに築いてまいります。",
    ],
    image: "/images/c7309b02f51b.webp",
  },
  services: {
    en: "SERVICES",
    ja: "事業内容",
    items: [
      { title: "M＆A マッチング支援サービス", image: "/images/30be172968ea.webp", brightness: 0.7, wide: true },
      { title: "事業アセスメントサービス", image: "/images/346af5d2dda7.webp", brightness: 0.6 },
      { title: "経営顧問サービス", image: "/images/d242722abaa9.webp", brightness: 0.6 },
    ],
  },
  cta: {
    lead: "保険代理店の未来を、共に考える。<br>M&amp;A・事業承継・経営支援の提供を通じて、保険代理店の持続的な成長をサポートしています。",
    sub: "ご相談等は、こちらから<br>お気軽にお問い合わせください。",
  },
  news: {
    en: "NEWS",
    ja: "ニュース",
    items: [
      {
        date: "2026.07.28",
        tag: "お知らせ",
        title: "中小M&amp;Aガイドライン（第3版）遵守の宣言について",
        href: "https://storage.googleapis.com/studio-design-asset-files/projects/JpOL36leWQ/s-1x1_31749cf2-5e57-452c-9c35-c1a5264763a9.pdf",
      },
      {
        date: "2025.12.08",
        tag: "お知らせ",
        title: "冬季休業のお知らせ",
        body: "誠に勝手ながら、12月27日から翌1月4日まで<br>冬季休業とさせていただきます。",
      },
      { date: "2025.11.01", tag: "お知らせ", title: "アシガルコンサルティング公式サイトを開設しました" },
    ],
  },
  // The full-bleed pair of photos between News and the footer.
  band: [
    { image: "/images/812574d3f766.jpg", brightness: 0.7 },
    { image: "/images/30be172968ea.webp", brightness: 1 },
  ],
};

export const about = {
  title: "会社概要｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社",
  hero: { en: "ABOUT US", ja: "私たちについて", image: "/images/14d6ca7cbf4a.webp", brightness: 0.6 },
  story: {
    en: "About Us",
    ja: "私たちについて",
    heading: "私たちの原点(創業の想い・ストーリー)",
    body: [
      "「そういうこっちが、本当に聞きたいことを、メーカーの社員は全然教えてくれへんのや」<br>ある代理店さんからリテールの営業所に新人として配属されたときに頂いた叱咤激励の言葉。",
      "　その時は意味を掴み切れませんでしたが、業界でキャリアを重ねていくうちに、保険会社は代理店さんの本当の悩みに正面から向き合えていない現実に気づかされました。",
      "　あれから 10 年以上の月日が経ち、目の前の代理店さんと日々起こる悩みに同じ気持ちでかじりつき、解決していくパートナーでありたいという思いから、アシガルコンサルティングを立ち上げました。",
      "　当社のコンサルタントは全員が損害保険業界出身者の集まりというわけではありません。<br>しかし、大事にしている信念があります。それは「現場こそが全てである」というものです。",
      "　この信念を共有し、現場で培った経験を元に実際の問題解決に取り組んできた、各分野に高い専門性を持つコンサルタントが集いました。",
      "　今、業界には激動の変化の波が押し寄せています。",
      "　私たち、アシガルコンサルティングは皆様の悩みに誰よりも真摯に向き合い、次の一手を示す伴走者として、最高の未来をともに作り上げていくことをご約束します。<br><br>アシガルコンサルティング株式会社<br>コンサルタント 一同",
    ],
    image: "/images/272daf018c75.webp",
  },
  mission: {
    en: "Mission（理念）",
    ja: "Mission / Vision / Value（MVV）",
    body: "私たちは「現場第一」という信念のもと、代理店に寄り添い、誠実かつ真摯に業界の課題へ向き合い続けます。<br>そして、地域社会への持続的な保険・金融サービスの供給を支えることで、代理店が信頼と安心の好循環を築くことを後押しします。",
    images: [
      "/images/09d324e6f43e.webp",
      "/images/3d7efdad0d5a.webp",
      "/images/346af5d2dda7.webp",
      "/images/b5b2c2bed2a7.webp",
    ],
  },
  vision: {
    en: "Vision（ビジョン）",
    ja: "Mission / Vision / Value（MVV）",
    body: `M&amp;A マッチング支援サービスを始めとした革新的な事業の運営を通じて、日本から世界と戦える保険仲介・保険代理業モデルを創り出し、業界の地位向上と新たな成${CHO}を実現します。`,
    image: "/images/cf1956943104.jpg",
    imgHeight: 290,
  },
  value: {
    en: "Value<br>（価値観・行動指針）",
    ja: "Mission / Vision / Value（MVV）",
    body: "1. 現場起点<br>すべての判断と行動は、現場の生の声を出発点とする。<br><br>2. 挑戦心<br>業界の常識を超え、新しい仕組みを創り出す挑戦を続ける。<br><br>3. 感謝と尊敬<br>これまで地域社会を支えてきた代理店の努力に敬意を払い、感謝の心を忘れない。",
    image: "/images/30be172968ea.webp",
    imgHeight: 511,
  },
  profile: {
    en: "会社概要（Company Profile）",
    ja: "会社情報",
    // `link` turns the LABEL itself into an anchor, which is what the live site does —
    // including putting an open_in_new icon next to tel: and mailto:.
    rows: [
      { label: "会社名", value: "アシガルコンサルティング株式会社" },
      {
        label: "所在地",
        value: "〒150-0043<br>東京都渋谷区道玄坂 1 丁目 10 番 8 号<br>渋谷道玄坂東急ビル 2F-C<br>（Google Map を表示）",
        link: "map",
        external: true,
      },
      { label: "代表者", value: "代表取締役　田端 翔一郎" },
      { label: "設立", value: "2025 年 9 月" },
      {
        label: "事業内容",
        value:
          "1.企業経営、経営戦略に関するコンサルティング<br>2.M＆A の仲介及び事業承継、相続対策に関するコンサルティング<br>3.市場調査、市場分析、マーケティング情報の収集及び分析<br>4.広告、宣伝、販売促進に関する企画・制作・運営<br>5.セミナー、研修、イベントの企画・制作・運営<br>6.出版物の企画、編集、発行および販売並びに著作権の管理<br>7.前各号に附帯または関連する一切の業務",
      },
      { label: "電話番号", value: "03-6261-0660", link: "tel", external: true },
      { label: "メール", value: "info@ashigaru-consulting.co.jp", link: "mail", external: true },
      { label: "受付時間", value: "平日 9:00～18:00<br>休業日：土曜・日曜・祝日・年末年始" },
      { label: "登録番号", value: "適格請求書発行事業者登録番号：T5011001172491" },
      { label: "関連リンク", value: "個人情報保護方針<br>（別ウィンドウで開きます）", link: "privacy", external: true },
    ],
  },
  access: {
    en: "アクセス情報",
    ja: "Googleマップ",
    rows: [
      {
        label: "所在地",
        value: "〒150-0043<br>東京都渋谷区道玄坂 1 丁目 10 番 8 号<br>渋谷道玄坂東急ビル 2F-C<br>（Google Map を表示）",
        link: "map",
        external: true,
      },
    ],
  },
};

export const service = {
  title: "事業内容｜保険代理店のM&A・事業承継支援ならアシガルコンサルティング株式会社",
  hero: { en: "SERVICES", ja: "サービス紹介", image: "/images/599f50e26031.jpg", brightness: 0.6 },
  heading: { en: "OUR SERVICES", ja: "アシガルコンサルティングのサービス紹介" },
  items: [
    {
      title: "M＆A マッチング支援サービス",
      body: `保険代理店の事業承継や M&amp;A を円滑に進めるためのマッチングを行います。<br><br>売却を検討される代理店様と買収による成${CHO}を目指す代理店・事業者様との出会いをサポートし、双方に納得感のある取引を支援いたします。<br><br>案件情報は、当社の個人情報保護方針および個人情報の取り扱いに関する関係法令等に基づき、識別されない形で適切に管理しておりますので、安心してご相談いただけます。`,
      image: "/images/30be172968ea.webp",
    },
    {
      title: "事業アセスメントサービス",
      body: `代理店の現在の契約ポートフォリオと将来の潜在的な可能性を、専門家の視点から定量・定性の両面で分析し、経営判断を支える客観的な評価を提示します。<br><br>①成${CHO}力診断サービス：買い手側の代理店様の組織の成${CHO}余地や強み・課題を可視化し、今後の経営戦略の方向性を整理します。<br><br>②市場価値診断サービス：売り手側の代理店様の収益性や規模、事業ポートフォリオなどをもとに、M&amp;Aや提携時における参考となる価値を評価・算出します。`,
      image: "/images/346af5d2dda7.webp",
    },
    {
      title: "経営顧問サービス&nbsp;",
      body: `代理店様の中${CHO}期的な経営課題に、継続的な伴走支援を提供します。<br>経営戦略策定や事業承継への備え、新規開拓や組織体制強化、改正保険業法への対応など、幅広いテーマをカバーし、安定と成${CHO}を支えます。`,
      image: "/images/d242722abaa9.webp",
    },
  ],
};

export const contact = {
  title: "保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社",
  heading: "【無料】お気軽にご連絡ください",
  intro: [
    "事業承継や代理店の将来について、すでに多くの経営者様からご相談をいただいています。<br><br>「少し不安だな」と思ったときこそ、将来を見据えて踏み出すタイミングです。",
    "",
    "まずは現状をお聞かせください！",
  ],
  urgent: "お急ぎの方はお電話からお問い合わせください。",
  hours: "受付： （平日 9:00～18:00）",
  fields: [
    { kind: "text", name: "Name", label: "お名前", required: true, placeholder: "山田　太郎" },
    { kind: "tel", name: "Phone", label: "電話番号", required: true, placeholder: "000-0000-0000" },
    { kind: "email", name: "Email", label: "メールアドレス", required: true, placeholder: "xxx@example.com" },
    {
      kind: "select",
      name: "position-pulldown",
      label: "役職区分",
      required: true,
      options: [
        "選択してください",
        "法人代理店の店主",
        "法人代理店の募集人",
        "個人代理店（屋号あり）",
        "保険会社・インシュアテック",
        "士業・金融機関・M&A事業者",
        "その他",
      ],
    },
    {
      kind: "text",
      name: "company_name",
      label: "貴社名／屋号",
      required: true,
      placeholder: "例) 〇〇株式会社   or   会社名なし",
      note: "※法人代理店店主・個人代理店（屋号あり）の方は必ずご入力ください<br>※募集人・その他の方で会社名や屋号がない方は「なし」とご入力ください",
    },
    {
      kind: "select",
      name: "interest",
      label: "ご関心のある内容",
      required: true,
      options: [
        "選択してください",
        "【譲渡】自代理店の事業譲渡",
        "【譲渡】他代理店へ合流希望",
        "【買収】他代理店の買収希望",
        "【共通】代理店価値の診断",
        "【共通】経営顧問・その他",
        "【外部】当社への営業・ご提案",
      ],
      note: "※選択肢のご説明<br>・【譲渡】自代理店の事業譲渡<br>　法人代理店・個人代理店を第三者に譲り、引退・廃業を検討している方<br>・【譲渡】他代理店へ合流希望<br>　法人代理店・個人代理店が引退・廃業を伴わず、他代理店への合流を求めている方<br>　※法人代理店の募集人が他代理店への移籍を求めている場合もこちらを選択ください。<br>・【買収】他代理店の買収希望<br>　法人代理店・個人代理店を買収し、既存事業の拡大や営業エリアの拡大を図りたい方<br>・【共通】代理店価値の診断<br>　自代理店の市場価値・収益力を把握し、将来の譲渡・買収、経営判断に備えたい方<br>【共通】経営顧問・その他<br>　代理店経営における戦略や法令対応などの支援、またはその他のご相談をご希望の方",
    },
    { kind: "textarea", name: "Message", label: "ご相談内容", required: false, placeholder: "詳しい内容を記入してください" },
  ],
  consent: "個人情報保護方針に同意して送信する",
  submit: "この内容で送信する",
  notes: [
    "◆お問い合わせに際してのお願い",
    'ご入力いただきました個人情報は当社の<a href="/privacypolicy" target="_blank" rel="noopener">「個人情報保護方針」</a>（別ウィンドウにて表示）に基づき、適切かつ安全に管理いたします。<br>お問い合わせ内容を送信された場合には、当該方針にご同意いただいたものとして取り扱います。',
    "当ウェブサイトは SSL サーバ証明書を導入しており、送信される情報は暗号化通信により、第三者による不正な取得、改ざん、または成りすまし等から保護されます。",
    "なお、ご提供いただいた個人情報は、セミナーその他の事業において当社が共催する法人に対して提供する場合がございます。<br>その場合を除き、法令に基づく場合を除いて、第三者に開示または提供することは一切ございません。",
  ],
};

export const thanks = {
  title: "保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社",
  heading: "お問い合わせありがとうございます",
  // Empty strings are real empty <p> elements in the source rich text — STUDIO uses them
  // as blank lines and they occupy 16px each, so dropping them shortens the page.
  body: [
    "内容を確認のうえ、通常 3 営業日以内に担当者よりご連絡いたします。",
    'お急ぎの際は、恐れ入りますが <a href=\"tel:03-6261-0660\" target=\"_blank\" rel=\"noopener\">03-6261-0660</a> までお電話ください。',
    "",
    "ご入力いただいたメールアドレス宛に確認用の自動返信メールをお送りしております。",
    "<strong><u>※接続環境によっては、メール到着までに5-10分ほどかかる場合がございます。</u></strong>",
    "",
    "万一届かない場合は、入力されたメールアドレスに誤りがないか、または迷惑メールフォルダをご確認ください。受信できない場合は、お手数ですが再度フォームよりお問い合わせいただくか、お電話にてご連絡ください。",
  ],
  backLabel: "ホームへ戻る",
};

export const privacy = {
  title: "保険代理店のM&A・事業承継支援なら｜アシガルコンサルティング株式会社",
  heading: "個人情報保護方針",
  lead: "アシガルコンサルティング株式会社（以下「当社」といいます。）は、利用者に関する情報を以下の通り、取り扱います。",
  sections: [
    {
      h: "1.個人情報の収集",
      blocks: [
        { type: "p", text: "当社は、保険代理店のM&amp;A・事業承継支援サービスを中心に、経営・事業に関するコンサルティングを行う企業として、個人情報の保護を重要な社会的責任と認識しています。<br>当社は、個人情報の適正な取扱いを推進するため、以下の方針に基づき、個人情報の保護に努めます。" },
        {
          type: "ol",
          items: [
            "当社は、事業内容および規模に応じた適切な体制を整備し、個人情報を適法かつ公正な手段により取得・利用・提供いたします。利用目的を明確にし、その目的の範囲を超えて個人情報を取り扱うことはありません。",
            "個人情報保護に関する法令、国が定める指針およびその他の規範を遵守し、社内規程を整備・運用します。",
            "個人情報への不正アクセス、漏えい、滅失またはき損などの防止および是正に努め、適切な安全管理措置を講じます。",
            "個人情報の取扱いに関する苦情および相談に誠実かつ迅速に対応します。",
            "個人情報保護の体制・仕組みを継続的に見直し、改善に努めます。",
          ],
        },
      ],
    },
    {
      h: "2.個人情報の利用目的",
      blocks: [
        { type: "p", text: "当社は、以下の目的の範囲内で個人情報を利用いたします。" },
        {
          type: "ol",
          items: [
            "当社サービスに関するお問い合わせやご相談への回答、資料送付のため",
            "当社が提供する各種サービス（M&amp;Aマッチング支援、事業アセスメント、経営顧問など）の案内および実施のため",
            "契約の締結および履行、業務連絡のため",
            "採用活動における応募者の選考、連絡、管理のため",
            "当社への来訪者管理やセキュリティ確保のため",
            "サービス向上・マーケティング分析・アクセス解析のため（Cookieの利用を含む）",
          ],
        },
      ],
    },
    {
      h: "3.個人情報の第三者提供",
      blocks: [
        { type: "p", text: "当社は、次の場合を除き、本人の同意なく個人情報を第三者に提供しません。" },
        {
          type: "ul",
          items: [
            "法令に基づく場合",
            "人の生命、身体または財産の保護のために必要がある場合",
            "業務委託に伴い、業務遂行上必要な範囲で委託先に提供する場合（委託先に対しては適切な監督を行います）",
          ],
        },
      ],
    },
    {
      h: "4.個人情報の委託",
      blocks: [
        { type: "p", text: "当社は、業務遂行に必要な範囲で個人情報の取扱いを外部に委託する場合があります。<br>委託先に対しては、契約により個人情報の適正な管理を義務付け、必要かつ適切な監督を実施します。" },
      ],
    },
    {
      h: "5.クッキー（Cookie）等の利用について",
      blocks: [
        { type: "p", text: "当社ウェブサイトでは、利便性向上やアクセス解析（Google Analytics等）を目的としてCookieを使用しています。これにより個人を特定できる情報を取得することはありません。<br>Cookieの使用を希望しない場合は、ブラウザの設定で無効化することが可能です。" },
      ],
    },
    {
      h: "6.安全管理措置",
      blocks: [
        { type: "p", text: "当社は、個人情報を正確かつ安全に管理するために、以下の措置を講じます。" },
        {
          type: "ul",
          items: [
            "アクセス制御やパスワード管理による不正アクセス防止",
            "従業員への教育・監督",
            "外部委託先への契約管理",
            "紙・電子媒体の盗難・紛失防止対策",
            "システム面でのセキュリティ対策の実施",
          ],
        },
      ],
    },
    {
      h: "7.個人情報に関する苦情・相談窓口",
      blocks: [
        {
          type: "p",
          text: '個人情報の取扱いに関するお問い合わせは、以下の窓口までご連絡ください。<br><br><strong>＜お問い合わせ窓口＞</strong><br>アシガルコンサルティング株式会社<br>〒150-0043<br>東京都渋谷区道玄坂 1 丁目 10 番 8 号 渋谷道玄坂東急ビル 2F-C<br>E-mail：<a href="/contact" target="_blank" rel="noopener">お問い合わせフォーム</a>よりご連絡ください。<br>電話番号：<a href="tel:03-6261-0660">03-6261-0660</a>',
        },
        { type: "p", text: "第1版 2025年10月6日　制定" },
      ],
    },
  ],
};
