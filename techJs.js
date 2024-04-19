function generateTagsFromJSON() {
    fetch('./tech.json') // JSON 파일 가져오기
        .then(response => response.json()) // JSON 형식으로 변환
        .then(data => {
            var teches = document.getElementById('teches'); // 태그를 넣을 컨테이너 요소 가져오기
            for (let i = 0; i < data.length; i += 4) { // 데이터 반복(4개씩)
                const floor = document.createElement('div'); // 새로운 tech div 태그 생성
                floor.className = 'floor'; // 클래스 설정

                for (let j = 0; j < 4; j++) {
                    const item = data[i + j];

                    const tech = document.createElement('div'); // 새로운 tech div 태그 생성
                    tech.className = 'tech'; // 클래스 설정

                    // 이미지 태그 생성
                    const img = document.createElement('img');
                    img.src = item.imgSrc; // 이미지 소스 설정
                    img.alt = item.title; // 대체 텍스트 설정
                    img.addEventListener('click', function() {
                        oepnTechInfo(tech);
                    }); // 클릭 이벤트 추가

                    let mouseTimer;
                    img.addEventListener('mouseenter', function() {
                        mouseTimer = setTimeout(function() {
                            oepnTechInfo(tech);
                        }, 500);
                    });
                    img.addEventListener('mouseleave', function() {
                        clearTimeout(mouseTimer);
                    }); // hover이벤트 추가, 일정시간 올리고 있을때 작동

                    tech.appendChild(img); // tech에 추가

                    // techInfo div 생성
                    const techInfoDiv = document.createElement('div');
                    techInfoDiv.className = 'techInfo';

                    // 두 번째 이미지 태그 생성
                    const img2 = document.createElement('img');
                    img2.src = item.imgSrc; // 이미지 소스 설정
                    img2.alt = item.title; // 대체 텍스트 설정
                    techInfoDiv.appendChild(img2); // techInfo에 추가

                    // h1 태그 생성
                    const h1 = document.createElement('h1');
                    h1.textContent = item.title; // 제목 설정
                    techInfoDiv.appendChild(h1); // techInfo에 추가

                    // p 태그 생성
                    const p = document.createElement('p');
                    p.textContent = item.content; // 내용 설정
                    techInfoDiv.appendChild(p); // techInfo에 추가

                    // 버튼 태그 생성
                    const button = document.createElement('button');
                    button.textContent = 'X'; // 버튼 내용 설정
                    button.addEventListener('click', function() {
                        closeTechInfo(tech);
                    }); // 클릭 이벤트 추가
                    techInfoDiv.appendChild(button); // techInfo에 추가

                    tech.appendChild(techInfoDiv); // tech에 techInfo 추가
                    floor.appendChild(tech); // floor에 생성한 tech 추가
                }
                teches.appendChild(floor); // floor에 생성한 tech 추가
            }
        })
        .catch(error => {
            console.error('Error fetching JSON:', error);
        });
}
generateTagsFromJSON();

function oepnTechInfo(tech) {
    const techInfo = tech.querySelector('.techInfo'); // tech 내부의 techInfo 요소 찾기
    if (!techInfo.classList.contains('open')) { // open 클래스가 없는 경우에만 추가
        techInfo.classList.add('open'); // open 클래스 추가
    }
}

function closeTechInfo(tech) {
    const techInfo = tech.querySelector('.techInfo'); // tech 내부의 techInfo 요소 찾기
    techInfo.classList.remove('open'); // open 클래스 제거
}