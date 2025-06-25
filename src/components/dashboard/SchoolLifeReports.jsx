import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SchoolLifeReports({ onItemClick }) {
  // 검색창에 입력한 값을 저장하는 상태
  const [searchTerm, setSearchTerm] = useState('');
  // 신고 목록을 저장하는 상태
  const [reports, setReports] = useState([]);

  // 컴포넌트가 처음 화면에 나타날 때 실행됨
  useEffect(() => {
    // 가짜 데이터 사용
    const mockData = [
      {
        id: 1,
        content: '급식실에서 학생들이 줄을 서지 않고 새치기해요',
        reporter: '오시온',
        date: '2025.06.23',
        status: '접수 중'
      },
      {
        id: 2,
        content: '복도에서 뛰어다니는 학생들이 많아서 위험해요',
        reporter: '리쿠',
        date: '2025.06.23',
        status: '처리 예정'
      },
      {
        id: 3,
        content: '교실에서 휴대폰을 계속 사용하는 학생이 있어요',
        reporter: '유우시',
        date: '2025.06.22',
        status: '처리 완료'
      },
      {
        id: 4,
        content: '학생들이 쓰레기를 아무 곳에나 버려요',
        reporter: '료',
        date: '2025.06.22',
        status: '접수 중'
      },
      {
        id: 5,
        content: '체육시간에 안전수칙을 지키지 않는 학생들이 있어요',
        reporter: '사쿠야',
        date: '2025.06.21',
        status: '처리 완료'
      }
    ];
    setReports(mockData); // 위의 가짜 데이터를 상태에 저장
  }, []);

  // 신고 상태(접수 중/처리 예정/처리 완료)에 따라 색깔을 다르게 보여주는 함수
  const getStatusColor = (status) => {
    switch (status) {
      case '접수 중':
        return 'bg-yellow-100 text-yellow-800'; // 접수 중은 노란색
      case '처리 예정':
        return 'bg-blue-100 text-blue-800'; // 처리 예정은 파란색
      case '처리 완료':
        return 'bg-green-100 text-green-800'; // 처리 완료는 초록색
      default:
        return 'bg-gray-100 text-gray-800'; // 그 외는 회색
    }
  };

  // 검색어에 따라 신고 목록을 필터링(검색)함
  const filteredReports = reports.filter(report =>
    report.content.toLowerCase().includes(searchTerm.toLowerCase()) || // 신고 내용에 검색어가 포함되면
    report.reporter.toLowerCase().includes(searchTerm.toLowerCase())   // 신고자 이름에 검색어가 포함되면
  );

  return (
    <>
      {/* 상단: 제목과 검색창 */}
      <div className="flex justify-between items-center mb-8">
        {/* 큰 제목 */}
        <h1 className="text-3xl font-bold text-gray-900">학교생활 신고</h1>
        {/* 검색창 */}
        <div className="relative">
          {/* 돋보기 아이콘 */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          {/* 검색 입력창 */}
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 입력값이 바뀔 때마다 상태 변경
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* 신고 목록 테이블(표) */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* 테이블 헤더(제목 줄) */}
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium">
            <div className="col-span-6">신고 내용</div>
            <div className="col-span-2">신고자</div>
            <div className="col-span-2">신고일</div>
            <div className="col-span-2">현황</div>
          </div>
        </div>

        {/* 신고 목록 */}
        <div className="divide-y divide-gray-200">
          {filteredReports.length > 0 ? (
            // 신고가 있을 때
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onItemClick && onItemClick(report.id)} // 클릭하면 상세보기로 이동
              >
                {/* 신고 내용 */}
                <div className="col-span-6">
                  <p className="text-gray-900 truncate" title={report.content}>
                    {report.content}
                  </p>
                </div>
                {/* 신고자 이름 */}
                <div className="col-span-2">
                  <p className="text-gray-900">{report.reporter}</p>
                </div>
                {/* 신고 날짜 */}
                <div className="col-span-2">
                  <p className="text-gray-600">{report.date}</p>
                </div>
                {/* 신고 상태 */}
                <div className="col-span-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            // 신고가 없을 때(검색 결과 없음)
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 하단: 신고 개수 표시 */}
      <div className="mt-6 flex justify-center">
        <div className="text-sm text-gray-500">
          총 {filteredReports.length}개의 신고가 있습니다.
        </div>
      </div>
    </>
  );
}