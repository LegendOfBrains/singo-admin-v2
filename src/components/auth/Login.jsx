import React, { useState } from 'react';
import Logo from '../../assets/logo.png'; // 로고 이미지 파일을 가져옴

// onLoginSuccess는 부모 컴포넌트에서 전달받는 함수 (로그인 성공시 실행됨)
export default function Login({ onLoginSuccess }) {
  // 상태(state) 관리 - 컴포넌트 안에서 변하는 데이터들
  const [email, setEmail] = useState(''); // 이메일 입력값을 저장하는 변수
  const [password, setPassword] = useState(''); // 비밀번호 입력값을 저장하는 변수
  const [emailError, setEmailError] = useState(''); // 이메일 에러 메시지를 저장하는 변수
  const [isLoading, setIsLoading] = useState(false); // 로그인 진행 중인지 확인하는 변수

  // 이메일이 올바른 형식인지 검사하는 함수
  const validateEmail = (email) => {
    // 이메일이 '@dgsw.hs.kr'로 끝나지 않으면 에러 메시지 반환
    if (!email.endsWith('@dgsw.hs.kr')) {
      return 'DGSW 이메일(@dgsw.hs.kr)만 사용 가능합니다.';
    }
    // 올바른 이메일이면 빈 문자열 반환 (에러 없음)
    return '';
  };

  // 이메일 입력창에 값이 변경될 때 실행되는 함수
  const handleEmailChange = (e) => {
    const newEmail = e.target.value; // 사용자가 입력한 새로운 이메일 값

    setEmail(newEmail); // 이메일 상태를 새로운 값으로 업데이트

    // 입력한 값이 있으면 (공백 제거 후 확인)
    if (newEmail.trim()) {
      const error = validateEmail(newEmail); // 이메일 유효성 검사 실행
      setEmailError(error); // 에러 메시지 상태 업데이트
    } else {
      setEmailError(''); // 입력값이 없으면 에러 메시지 지우기
    }
  };

  // 로그인 버튼 클릭하거나 폼 제출할 때 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const emailValidationError = validateEmail(email); // 이메일 유효성 한 번 더 검사

    // 이메일에 에러가 있으면 로그인 진행하지 않고 종료
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setIsLoading(true); // 로딩 상태 시작

    // 실제 로그인 API 호출 시뮬레이션 (1초 후 실행)
    setTimeout(() => {
      console.log('Login attempt:', { email, password }); // 콘솔에 로그인 시도 정보 출력

      // 여기서 실제 로그인 검증을 하고
      // 성공 시 사용자 정보 만들기
      const userData = {
        name: email.split('@')[0] + ' 선생님', // 이메일 앞부분 + '선생님'
        email: email
      };

      setIsLoading(false); // 로딩 상태 종료
      onLoginSuccess(userData); // 부모 컴포넌트에 로그인 성공 알리기
    }, 1000);
  };

  // 키보드 엔터키 눌렀을 때 실행되는 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e); // 엔터키 누르면 로그인 시도
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* 로고 영역 */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img 
              src={Logo}
              alt="신GO! 로고"
              className="h-25 w-40 rounded-xl"
            />
          </div>
        </div>

        {/* 로그인 폼 */}
        <div className="space-y-6">
          {/* 이메일 입력 부분 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email} // 현재 이메일 값
              onChange={handleEmailChange} // 입력할 때마다 handleEmailChange 함수 실행
              onKeyPress={handleKeyPress} // 키보드 누를 때마다 handleKeyPress 함수 실행
              className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                emailError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-blue-500'
              }`} // 에러가 있으면 빨간색, 없으면 파란색 테두리
              placeholder="발급 받은 이메일을 입력해주세요."
              disabled={isLoading} // 로딩 중일 때는 입력 비활성화
            />
            {/* 이메일 에러 메시지가 있으면 표시 */}
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          {/* 비밀번호 입력 부분 */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password} // 현재 비밀번호 값
              onChange={(e) => setPassword(e.target.value)} // 입력할 때마다 비밀번호 상태 업데이트
              onKeyPress={handleKeyPress} // 키보드 누를 때마다 handleKeyPress 함수 실행
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력해주세요."
              disabled={isLoading} // 로딩 중일 때는 입력 비활성화
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={handleSubmit} // 클릭하면 handleSubmit 함수 실행
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!!emailError || isLoading || !email || !password} // 에러가 있거나 로딩 중이거나 이메일/비밀번호가 비어있으면 비활성화
          >
            {isLoading ? '로그인 중...' : '로그인'} {/* 로딩 중이면 '로그인 중...' 아니면 '로그인' */}
          </button>
        </div>
      </div>
    </div>
  );
}