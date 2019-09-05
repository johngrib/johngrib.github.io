---
layout  : wiki
title   : 이메일 주소 형식 검증하기
summary : Verify email address format
date    : 2019-04-11 22:05:44 +0900
updated : 2019-09-05 18:21:40 +0900
tag     : email regex php
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

* 이메일 주소 검증 코드를 짤 일이 있어 작업한 기록을 남긴다.


# 정규식을 얻어와 복붙하자

정규식을 일일이 작성하기는 귀찮은 노릇이니 [emailregex.com](http://emailregex.com/ )에서 정규식을 얻었다.

구글에서 `verify email address with regex`로 검색하면 바로 나오는 사이트인데,
타이틀이 굉장히 자신감 넘친다.

"Email Address Regular Expression That 99.99% Works."

들어가보면 이메일 형식 검증을 위한 정규식을 여러 언어별로 소개하고 있다.

일단 나는 오늘 php로 작업했으므로 php 이메일 정규식을 복사했다.

```js
/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:
\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27
\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\
x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\
x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x
23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn
--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z
0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7}
)|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a
-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-
9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})
?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|
(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|
(?:[1-9]?[0-9]))){3}))\]))$/iD
```

1070 글자나 된다.

어쨌건 복붙하고 다음과 같은 함수를 작성하였다.

```php
private const EMAIL_REGEX = '/^.....$/iD';  // 길어서 생략

public function isValidAddress(string $address): bool
{
    return !empty($address) && preg_match(self::EMAIL_REGEX, $address);
}
```

# 테스트 케이스도 작성하자

제대로 돌아가는지 확인하기 위해 kahlan을 써서 테스트 코드도 작성하였다.

테스트 케이스는 [MSDN의 Email Address test cases](https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/ )을 거의 그대로 가져다 썼다.

인덴트가 많아서 고의로 인덴트를 2 space로 표현하였다.

```php
describe('isValid', function() {
  context('with valid email addresses', function(){
    given('addresses', function () {
      // see: https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
      return [
        'email@domain.com' ,              // Valid email
        'firstname.lastname@domain.com',  // Email contains dot in the address field
        'email@subdomain.domain.com',     // Email contains dot with subdomain
        'firstname+lastname@domain.com',  // Plus sign is considered valid character
        'email@123.123.123.123',          // Domain is valid IP address
        'email@[123.123.123.123]',        // Square bracket around IP address is considered valid
        '"email"@domain.com',             // Quotes around email is considered valid
        '1234567890@domain.com',          // Digits in address are valid
        'email@domain-one.com',           // Dash in domain name is valid
        '_______@domain.com',             // Underscore in the address field is valid
        'email@domain.name',              // .name is valid Top Level Domain name
        'email@domain.co.jp',             // Dot in Top Level Domain name also considered valid (use co.jp as example here)
        'firstname-lastname@domain.com'   // Dash in address field is valid
      ];
    });

    it('returns true', function(){
      foreach ($this->addresses as $address) {
        expect($this->emailUtil->isValidAddress($address))->toBeTruthy();
      }
    });
  });

  context('with invalid email addresses', function(){
    given('addresses', function () {
      // see: https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
      return [
        '',
        '  ',
        '123',
        'plainaddress',                 // Missing @ sign and domain
        '#@%^%#$@#$@#.com',             // Garbage
        '@domain.com',                  // Missing username
        'Joe Smith <email@domain.com>', // Encoded html within email is invalid
        'email.domain.com',             // Missing @
        'email@domain@domain.com',      // Two @ sign
        '.email@domain.com',            // Leading dot in address is not allowed
        'email.@domain.com',            // Trailing dot in address is not allowed
        'email..email@domain.com',      // Multiple dots
        'あいうえお@domain.com',           // Unicode char as address
        'email@domain.com (Joe Smith)', // Text followed email is not allowed
        'email@domain',                 // Missing top level domain (.com/.net/.org/etc)
        'email@-domain.com',            // Leading dash in front of domain is invalid
        'email@111.222.333.44444',      // Invalid IP format
        'email@domain..com',            // Multiple dot in the domain portion is invalid
      ];
    });

    it('returns false', function(){
      foreach ($this->addresses as $address) {
        expect($this->emailUtil->isValidAddress($address))->toBeFalsy();
      }
    });
  });
});
```

# 테스트 케이스가 실패하니 정규식을 고치자

그런데 **with valid email addresses**의
`email@123.123.123.123`, `email@[123.123.123.123]`에서 테스트가 실패한다!

99.99% 통하는 정규식이라더니 이 두 케이스가 0.01% 에 해당하는 경우인 모양이다.

하는 수 없지. 정규식을 수정해서 쓰기로 했다.

저 두 경우만 통과하면 되니까 `|`과 함께 집어넣으면 될 것이다.

적당히 쪼개고 딱 두 줄만 추가했다.

```php
private const EMAIL_REGEX = '/^'
  . '(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})'
  . '(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)'
  . '(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))'
  . '(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*'
  . '@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)'
  . '|(?:[0-9]{3}\.){3}[0-9]{3}'       // for test case 'email@123.123.123.123'
  . '|\[(?:[0-9]{3}\.){3}[0-9]{3}\]'   // for test case 'email@[123.123.123.123]'
  . '|(?:\[(?:(?:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))'
  . '|(?:(?:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))'
  . '$/iD';
```

이제 모든 테스트 케이스가 다 통과한다.

하지만 이걸로 끝일까?

# IPv4, IPv6 도 검증 가능하도록 고치자

테스트 케이스는 통과하지만 추가한 두 줄을 잘 살펴보면 IP 주소를 제대로 표현하지 못한다는 것을 쉽게 알 수 있다.

그래서 IPv4 와 IPv6 를 표현할 수 있도록 다음과 같이 수정하였다.

```php
private const IPV4_REGEX = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
private const IPV6_REGEX = '(?:(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}|(?=(?:[A-F0-9]{0,4}:){0,7}[A-F0-9]{0,4}$)(([0-9A-F]{1,4}:){1,7}|:)((:[0-9A-F]{1,4}){1,7}|:)|(?:[A-F0-9]{1,4}:){7}:|:(:[A-F0-9]{1,4}){7})';

// see: http://emailregex.com/
private const EMAIL_REGEX = '/^'
    . '(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})'
    . '(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)'
    . '(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))'
    . '(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*'
    . '@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)'
    . '|' . self::IPV4_REGEX
    . '|\[' . self::IPV4_REGEX . '\]'
    . '|' . self::IPV6_REGEX
    . '|\[' . self::IPV6_REGEX . '\]'
    . '|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
    . '|\[(?:[0-9]{3}\.){3}[0-9]{3}\]'   // for test case 'email@[123.123.123.123]'
    . '|(?:\[(?:(?:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))'
    . '|(?:(?:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))'
    . '$/iD';
```

위의 두 정규식은 [한 권으로 끝내는 정규표현식(Regular Expressions Cookbook)](http://www.hanbit.co.kr/store/books/look.php?p_code=B1048739715 )을 참고해 옮긴 것이다.


그리고 다음은 IPv6 테스트까지 포함한 테스트 코드이다.

```php
describe('isValidAddress', function() {
context('with valid email addresses', function(){
  given('addresses', function () {
    // see: https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
    return [
      'email@domain.com' ,                // Valid email
      'firstname.lastname@domain.com',    // Email contains dot in the address field
      'email@subdomain.domain.com',       // Email contains dot with subdomain
      'firstname+lastname@domain.com',    // Plus sign is considered valid character
      'email@123.123.123.123',            // Domain is valid IP address
      'email@127.0.0.1',
      'email@[123.123.123.123]',          // Square bracket around IP address is considered valid
      'email@[127.0.0.1]',
      '"email"@domain.com',               // Quotes around email is considered valid
      '1234567890@domain.com',            // Digits in address are valid
      'email@domain-one.com',             // Dash in domain name is valid
      '_______@domain.com',               // Underscore in the address field is valid
      'email@domain.name',                // .name is valid Top Level Domain name
      'email@domain.co.jp',               // Dot in Top Level Domain name also considered valid (use co.jp as example here)
      'firstname-lastname@domain.com',    // Dash in address field is valid
      'email@FE84:0000:0000:0000:1112:BBFF:AEFA:9999',    // IPv6
      'email@[FE84:0000:0000:0000:1112:BBFF:AEFA:9999]',  // IPv6
    ];
  });

  it('returns true', function(){
    foreach ($this->addresses as $address) {
      expect($this->emailUtil->isValidAddress($address))->toBeTruthy();
    }
  });
});

context('with invalid email addresses', function(){
  given('addresses', function () {
    // see: https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
    return [
      '',
      '  ',
      '123',
      'plainaddress',                 // Missing @ sign and domain
      '#@%^%#$@#$@#.com',             // Garbage
      '@domain.com',                  // Missing username
      'Joe Smith <email@domain.com>', // Encoded html within email is invalid
      'email.domain.com',             // Missing @
      'email@domain@domain.com',      // Two @ sign
      '.email@domain.com',            // Leading dot in address is not allowed
      'email.@domain.com',            // Trailing dot in address is not allowed
      'email..email@domain.com',      // Multiple dots
      'あいうえお@domain.com',           // Unicode char as address
      'email@domain.com (Joe Smith)', // Text followed email is not allowed
      'email@domain',                 // Missing top level domain (.com/.net/.org/etc)
      'email@-domain.com',            // Leading dash in front of domain is invalid
      'email@111.222.333.44444',      // Invalid IP format
      'email@domain..com',            // Multiple dot in the domain portion is invalid
    ];
  });

  it('returns false', function(){
    foreach ($this->addresses as $address) {
      expect($this->emailUtil->isValidAddress($address))->toBeFalsy();
    }
  });
});
```

# php의 Filter 사용하기

- `FILTER_VALIDATE_EMAIL`을 사용하면 위와 같이 복잡한 정규식을 사용하지 않아도 된다.
    - 이 필터는 [RFC 822](https://www.w3.org/Protocols/rfc822/ )를 따른다고 한다.
    - 단, 이 방법을 사용하면 `@` 뒤쪽에 IPv4, IPv6 포맷의 도메인이 오는 경우를 검증하지 못한다.

```php
public function isValidAddress(string $address): bool
{
    return !empty($address) && filter_var($address, FILTER_VALIDATE_EMAIL);
}
```



# Links

* [RFC 4291](https://tools.ietf.org/html/rfc4291 ) - IP Version 6 Addressing Architecture
* [RFC 5321](https://tools.ietf.org/html/rfc5321 ) - Simple Mail Transfer Protocol(SMTP)
* [RFC 822](https://www.w3.org/Protocols/rfc822/ ) - Standard for ARPA Internet Text Messages
* [emailregex.com](http://emailregex.com/ )
* [Email Address test cases(MSDN)](https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/ )
* [한 권으로 끝내는 정규표현식(Regular Expressions Cookbook)](http://www.hanbit.co.kr/store/books/look.php?p_code=B1048739715 )
* [php Validate filters](https://www.php.net/manual/en/filter.filters.validate.php )
