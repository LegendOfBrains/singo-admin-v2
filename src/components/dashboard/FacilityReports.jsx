import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react'; // 검색 아이콘 가져오기

export default function FacilityReports({ onItemClick }) {
  // 상태(state) 관리 - 컴포넌트 안에서 변하는 데이터들
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 변수
  const [reports, setReports] = useState([]); // 신고 목록을 저장하는 배열

  // useEffect: 컴포넌트가 처음 실행될 때 한 번만 실행되는 코드
  useEffect(() => {
    // 실제로는 서버에서 데이터를 가져오겠지만, 지금은 가짜 데이터 사용
    const mockData = [
      {
        id: 1, // 신고 번호
        content: '2학년 3반 에어컨이 고장났어요ㅠㅠㅠㅠㅠ', // 신고 내용
        reporter: '서진교', // 신고한 사람
        date: '2025.06.23', // 신고한 날짜
        status: '접수 중' // 처리 상태
      },
      {
        id: 2,
        content: '2학년 복도 정수기에서 이상한 맛이 나요ㅠㅠㅠㅠㅠ',
        reporter: '신민채',
        date: '2025.06.23',
        status: '처리 예정'
      },
      {
        id: 3,
        content: '신관내용신관내용신관내용신관내용신관내용신관내용신관내용',
        reporter: '서진규',
        date: '2025.06.23',
        status: '처리 완료'
      },
      {
        id: 4,
        content: '3학년 화장실 문이 잠기지 않아요',
        reporter: '신민재',
        date: '2025.06.22',
        status: '접수 중'
      },
      {
        id: 5,
        content: '도서관 컴퓨터가 느려요',
        reporter: '신민주',
        date: '2025.06.22',
        status: '처리 완료'
      }
    ];
    setReports(mockData); // 가짜 데이터를 reports 상태에 저장
  }, []); // 빈 배열 []은 컴포넌트가 처음 렌더링될 때만 실행한다는 뜻

  // 상태에 따라 색깔을 정하는 함수
  const getStatusColor = (status) => {
    switch (status) {
      case '접수 중':
        return 'bg-yellow-100 text-yellow-800'; // 노란색 배경, 어두운 노란색 글자
      case '처리 예정':
        return 'bg-blue-100 text-blue-800'; // 파란색 배경, 어두운 파란색 글자
      case '처리 완료':
        return 'bg-green-100 text-green-800'; // 초록색 배경, 어두운 초록색 글자
      default:
        return 'bg-gray-100 text-gray-800'; // 기본은 회색
    }
  };

  // 검색어로 필터링된 신고 목록 만들기
  const filteredReports = reports.filter(report =>
    // 신고 내용이나 신고자 이름에 검색어가 포함되어 있으면 true 반환
    report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* 페이지 제목과 검색창 */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">시설 신고</h1>
        <div className="relative">
          {/* 검색 아이콘 */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {/* 검색 입력창 */}
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm} // 현재 검색어 값
            onChange={(e) => setSearchTerm(e.target.value)} // 입력할 때마다 검색어 업데이트
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 신고 목록 테이블 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* 테이블 헤더 (제목 부분) */}
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium">
            <div className="col-span-6">신고 내용</div> {/* 6칸 차지 */}
            <div className="col-span-2">신고자</div> {/* 2칸 차지 */}
            <div className="col-span-2">신고일</div> {/* 2칸 차지 */}
            <div className="col-span-2">현황</div> {/* 2칸 차지 */}
          </div>
        </div>

        {/* 테이블 내용 */}
        <div className="divide-y divide-gray-200">
          {/* 필터링된 신고가 있으면 목록 보여주기 */}
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id} // 각 항목의 고유 식별자
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onItemClick && onItemClick(report.id)} // 클릭하면 상세 페이지로
              >
                {/* 신고 내용 */}
                <div className="col-span-6">
                  <p className="text-gray-900 truncate" title={report.content}>
                    {report.content}
                  </p>
                </div>
                {/* 신고자 */}
                <div className="col-span-2">
                  <p className="text-gray-900">{report.reporter}</p>
                </div>
                {/* 신고일 */}
                <div className="col-span-2">
                  <p className="text-gray-600">{report.date}</p>
                </div>
                {/* 처리 현황 */}
                <div className="col-span-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            // 검색 결과가 없을 때 보여줄 메시지
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 총 개수 표시 */}
      <div className="mt-6 flex justify-center">
        <div className="text-sm text-gray-500">
          총 {filteredReports.length}개의 신고가 있습니다.
        </div>
      </div>
    </>
  );
}