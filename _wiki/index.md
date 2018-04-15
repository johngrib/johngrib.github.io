---
layout  : wikiindex
title   : wiki
date    : 2017-11-26 21:38:36 +0900
updated : 2018-04-15 17:47:43 +0900
tags    : index
toc     : true
public  : true
comment : false
---

* [[diary]]

* [[algorithm]]
    * [[von-neumann-extractor]]
* [[clipping]]{글 모음 및 요약}
    * [[legend]]
        * [[Bill-Atkinson-productivity]]
        * [[gerald-weinberg-language-king]]
        * [[James-Gosling-super-programmer]]
        * [[John-von-Neumann]]
    * [[Software-Engineering-Code-of-Ethics]]
    * [[THE-NEXT-BIG-BLUE-COLLAR-JOB-IS-CODING]]
* [[coding-font]]{코딩 폰트}
* [[how-to]]
    * [[googling]]
    * [[mathjax-latex]]
* [[mac-keyboard-shortcuts]]
* [[math]]
    * [[Bayes-theorem]]
    * [[Cromwell-s-rule]]
    * [[frac1e]]{n개의 제비뽑기에 n번 도전}
    * rule-of-succession
    * [[secretary-problem]]
* [[media]]
    * [[book]]{도서}
        * [[17-EQUATIONS-THAT-CHANGED-THE-WORLD]]
        * [[Algorithms-to-Live-By]]
        * [[Clean-Code]]
        * [[Code-Complete-2]]
        * [[DevOps-Troubleshooting]]
        * [[DOM-Enlightenment-by-Cody-Lindley]]{DOM을 깨우치다}
        * [[Effective-Java]]
        * [[Geek-Atlas]]
        * [[GoF-Design-Pattern]]
        * [[HELL-BOY]]
        * [[HTTP-no-Kyokasho]]
        * [[HTTP-THE-DEFINITIVE-GUIDE]]{HTTP 완벽 가이드}
        * [[Mythical-Man-Month]]
        * [[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]
        * [[SCIENTIFIC-AMERICAN-The-Secrets-Of-Consciousness]]
        * [[secret-of-consulting]]
        * [[Shunsho-juwa]]{수학자의 공부}
        * [[Software-Craftsman]]{소프트웨어 장인}
        * [[Take-the-Bully-by-the-Horns]]{함부로 말하는 사람과 대화하는 법}
        * [[TETRIS-EFFECT]]
        * [[TEXT-BOOK-OF-THE-WEB-ENGINEER]]{웹 엔지니어의 교과서}
        * [[The-Jargon-File]]
        * [[Think-Bayes]]{파이썬을 활용한 베이지안 통계}
        * [[toda-seiji-scientia]]
        * [[그림으로-보는-서양검술-메모]]
        * [[전생검신]]
        * [[한국과학문학상-수상작품집-제2회]]
    * [[review]]
        * [[review-2018]]
    * [[movie]]
        * [[ALPHAGO]]
        * [[DIRK-GENTLY-S-HOLISTIC-DETECTIVE-AGENCY]]
        * [[HOT-FUZZ]]{뜨거운 녀석들}
        * [[Las-chicas-del-cable]]
        * [[Walking-Dead]]
* [[design-pattern]]
    * [[builder-pattern]]
    * [[static-factory-method-pattern]]
* [[problem]]
    * [[cookie-problem]]
    * [[dice-problem]]
    * [[locomotive-problem]]
    * [[MnM-problem]]
    * [[Monty-Hall-problem]]
* [[programming-language]]{프로그래밍 언어}
    * [[Groovy]]
    * [[Java]]
        * [[Object-equals]]
        * [[Object-hashCode]]
        * [[Object-toString]]
        * [[private-constructor]]
        * [[use-java-primitive-type-for-performance]]
    * [[YAML]]
* [[proverb]]{속담, 법칙, 관용어 모음}
    * [[airplain-rule]]
    * [[Boy-Scout-Rule]]
    * [[Brooks-s-law]]
    * [[Copernican-Principle]]
    * [[Conway-s-law]]
    * [[Edsel-edict]]
    * [[Lubarsky-s-Law-of-Cybernetic-Entomology]]{루바르스키의 사이버네틱 곤충학 법칙}
    * [[No-Silver-Bullet]]
    * [[orange-juice-test]]
    * [[Postel-s-law]]
    * [[Zipf-s-law]]
* [[tools]]
    * [[command-line]]
        * [[df]]
        * [[du]]
        * [[fish-shell]]
        * [[java_home]]
        * [[brew]]
        * [[top]]
        * [[uptime]]
    * [[Gradle]]
    * [[mac-apps]]
        * [[Shortcat]]
    * [[useful-site]]
        * [[geacron]]
        * [[google-search-console-remove-outdated-content]]{구글 웹 도구 - 오래된 콘텐츠 삭제}
        * [[labs-strava-com-heatmap]]
        * [[utterances]]
        * [[미세먼지-정보]]
    * [[web-browser-extension]]
        * [[vimium]]
* [[til]]
    * [[git-checkout-specific-files]]
    * [[trouble-shooting-node-7-install]]
* [[Vim]]
    * [[vim-conceallevel]]{conceallevel (Vim)}
    * [[vim-f-hangul]]
    * [[vim-ycm-python3]]
    * [[vim-rest-console]]
    * [[vimwiki]]
* [[what]]
    * [[braille-pattern-chars]]
    * [[http-message]]
    * [[RFC]]
    * [[special-chars]]
    * [[URI]]
* [[why]]
    * [[letter-case]]
    * [[why-http-80-https-443]]

---

# blog
<div>
    <ul>
{% for post in site.posts %}
    {% if post.public != false %}
        <li>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">
                {{ post.title }}
            </a>
        </li>
    {% endif %}
{% endfor %}
    </ul>
</div>

