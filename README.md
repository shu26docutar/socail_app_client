MaterialUIのInstall

MaterialUIではv18のReactには対応できていないため通常の`npm install @material-ui/core`はエラーになるため、代わりに下記のコマンドを使用し、インストールする必要がる。

```command
npm install @mui/material @emotion/react @emotion/styled --legacy-peer-deps
npm install @mui/icons-material --legacy-peer-deps
```

# つまずきポイント：
Scream.jsx  
1  
React v18ではMUI Styleが適応されていなかったため、
MUIで行なっていることは同じであったため、Styleで対処

2  
画像を表示することができない、もしくは、特定のデータを取得することができない　　
考えられる原因：　　
firebaseにAPI作成に使用した古いデータが存在しているために、データを取得することができても、  
分散代入でエラーを起こし、通信でエラーが発生しており、取得できていないように感じる。
実際は、情報が整っておらず、取得時にうまく分散代入ができないことでエラーを起こしている可能性がある

3  
テキスト情報の取得は、`ref={}`ではなく、`inputRef={}`であること

4  
エラーハンドリングで一つのStateにデータを格納するが、エラーが発生してしまうため、分散して個々にデータを格納している

5  
通信中のローディングが表示されない、ボタンが`disabled`にならない問題
ローディングに対するステータスは問題なく機能していたが、`finally`なしの場合、ステータスが`true`にした後、直ぐに`false`に変更されてしまっているため、機能していないように見えていた

修正前
```javascript
axios.post(requests.fetchLogin, userData)
    .then((res) => {
        console.log('成功', res.data)
        navigation('/')
    })
    .catch((error) => {          
        setError(error.response.data.general)
        setEmailError(error.response.data.email)
        setPasswordError(error.response.data.password)
    })
    setLoading(false)
```


修正後  
```javascript
axios.post(requests.fetchLogin, userData)
    .then((res) => {
        console.log('成功', res.data)
        navigation('/')
    })
    .catch((error) => {          
        setError(error.response.data.general)
        setEmailError(error.response.data.email)
        setPasswordError(error.response.data.password)
    })
    .finally(() => {
      setLoading(false)
    })
```