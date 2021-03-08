function matching(user) {
    chrome.tabs.executeScript({
        code:'document.querySelector("body").innerText'
    }, function(result) {
        // After executing 'code'
    
        //이 문서에서 body 태그 아래에 있는 모든 텍스트를 가져온다. 그 결과를 bodyText라는 변수에 담는다.
        var bodyText = result[0];
        //bodyText의 모든 단어를 추출하고, 그 단어의 숫자를 센다. 그 결과를 bodyNum이라는 변수에 담는다.
        var bodyNum = bodyText.split(' ').length;
        //bodyText에서 자신이 알고 있는 단어(the)가 몇번 등장하는지를 알아본다. 그 결과를 myNum이라는 변수에 담는다.
        var myNum = bodyText.match(new RegExp('\\b('+ user +')\\b', 'gi')).length;
    
        var per = myNum/bodyNum*100;
        per = per.toFixed(2);
    
        //id 값이 result인 태그에 결과를 추가한다.
        document.querySelector('#result').innerText = myNum+'/'+bodyNum +'('+ per +'%)';
    });
}

// 크롬 스토리지에 저장된 값 가져오기
chrome.storage.sync.get(function(data) {
    // #user의 값으로 data의 값을 입력
    document.querySelector('#user').value = data.userWords;

    // 분석 후 결과를 #result에 출력
    matching(data.userWords);
});

// #user 입력 값이 변경되었을 때
document.querySelector('#user').addEventListener('change', function() {
    // 컨텐츠 페이지에 몇 개의 단어가 등장하는지 계산
    var user = document.querySelector('#user').value;

    // 크롬 스토리지에 입력 값 저장
    chrome.storage.sync.set({
        userWords:user
    });

    matching(user);
});