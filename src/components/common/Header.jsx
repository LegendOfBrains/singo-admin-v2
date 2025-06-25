import React from 'react';
import { LogOut } from 'lucide-react'; // 로그아웃 아이콘 가져오기
import Logo from '../../assets/mini-logo.png'; 

// userName: 로그인한 사용자 이름 (기본값은 "쇼타로 선생님")
// onLogout: 부모 컴포넌트에서 전달받는 로그아웃 함수
export default function Header({ userName = "쇼타로 선생님", onLogout }) {
  
  // 로그아웃 버튼 클릭했을 때 실행되는 함수
  const handleLogout = () => {
    // 부모 컴포넌트에서 onLogout 함수를 전달했으면 실행
    if (onLogout) {
      onLogout(); // 부모 컴포넌트의 로그아웃 함수 실행
    } else {
      console.log('로그아웃');
    }
  };

  return (
    // 헤더 전체 영역 - 흰색 배경, 그림자, 아래쪽 테두리
    <header className="bg-white shadow-sm border-b">
      {/* 헤더 내용 컨테이너 - 최대 너비 설정하고 가운데 정렬 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 내용 - 양쪽 끝에 배치, 세로 가운데 정렬, 높이 16 */}
        <div className="flex justify-between items-center h-16">
          
          {/* 왼쪽 영역 - 로고 부분 */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <img 
                src={Logo} 
                alt="신GO! 미니 로고" 
                className="mx-auto h-10 w-13" 
                />
            </div>
          </div>
          
          {/* 오른쪽 영역 - 사용자 이름과 로그아웃 버튼 */}
          <div className="flex items-center space-x-4">
            {/* 사용자 이름 표시 */}
            <span className="text-gray-700 font-medium">{userName}</span>
            
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout} // 클릭하면 handleLogout 함수 실행
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              // 아이콘과 텍스트를 가로로 배치, 마우스 올리면 색상 변화 효과
            >
              <LogOut className="w-4 h-4" /> {/* 로그아웃 아이콘 - 크기 4x4 */}
              <span>로그아웃</span> 
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}