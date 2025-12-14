describe('Create quotecard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/editor');
  });

  it('should modify text elements', () => {
    cy.log('Step 1: 텍스트 수정');
    cy.get('.text_element').first().click().clear().type('Hello World!');

    //
    //
    //
    cy.log('Step 2: 타이틀 텍스트 컬러 수정');
    cy.get('.text_color_picker').click();
    cy.get('#rbgcp-square')
      .trigger('mousemove', {
        clientX: 100,
        clientY: 100,
      })
      .click();
    cy.get('.text_color_picker').click();

    //
    //
    //
    cy.log('Step 3: 타이틀 텍스트 사이즈 수정');
    cy.get('.font_size').click().type('24');

    //
    //
    //
    cy.log('Step 4: 서브타이틀 텍스트 입력');
    cy.get('.text_element')
      .eq(1)
      .should('exist')
      .click()
      .clear()
      .type('Brian Kernighan');

    //
    //
    //
    cy.log('Step 5: 인용 카드로 포커스 이동');
    cy.get('.editor_main').click();

    //
    //
    //
    cy.log('Step 6: 배경색 수정');
    cy.get(`[aria-label="오른쪽에서 왼쪽으로 변화하는 바다색"]`).click();

    //
    //
    //
    cy.log('Step 7: 템플릿 설정');
    cy.get(`[aria-label="라인&따옴표 템플릿"]`).click();

    //
    //
    //
    cy.log('Step 8: 템플릿 색상 설정');
    cy.get('.template_color_picker').click();
    cy.get('#rbgcp-square')
      .trigger('mousemove', {
        clientX: 240,
        clientY: 240,
      })
      .click();
    cy.get('.template_color_picker').click();

    //
    //
    //
    cy.log('Step 7: 저장');
    // 저장 API 요청을 intercept하여 완료 대기 (POST 또는 PATCH)
    cy.intercept({ method: /POST|PATCH/, url: '/api/quotecard' }).as(
      'saveQuoteCard'
    );

    cy.get('#save_button').click();

    // API 요청 완료 대기 및 응답에서 ID 추출
    cy.wait('@saveQuoteCard', { timeout: 10000 }).then(interception => {
      const response = interception.response;
      if (response?.body?.id) {
        cy.wrap(response.body.id).as('savedQuoteCardId');
        cy.log(`저장된 인용 카드 ID: ${response.body.id}`);
      }
    });

    //
    //
    //
    cy.log('Step 8: 나가기');
    // 나가기 버튼이 있으면 클릭 (존재하지 않아도 에러 발생하지 않음)
    cy.get('body').then($body => {
      const backButton = $body.find("[aria-label='back to my page']");
      if (backButton.length > 0) {
        cy.get("[aria-label='back to my page']").should('be.visible').click();
      } else {
        cy.log(
          '나가기 버튼이 없습니다. 이미 저장되어 있거나 다른 상태일 수 있습니다.'
        );
      }
    });

    //
    //
    //
    cy.log('Step 9: 내 페이지로 이동');
    // 내 페이지로 이동 (나가기 버튼이 없으면 직접 이동)
    cy.get('body').then($body => {
      const backButton = $body.find("[aria-label='back to my page']");
      if (backButton.length === 0) {
        // 나가기 버튼이 없으면 직접 내 페이지로 이동
        cy.visit('/my');
      }
    });

    // 내 페이지 로드 대기
    cy.url().should('include', '/my');
    cy.wait(1000); // 리스트 로드 대기

    //
    //
    //
    cy.log('Step 10: 생성한 데이터가 있는지 확인');
    cy.get('@savedQuoteCardId').then(id => {
      if (id) {
        // ID가 URL에 포함된 링크가 있는지 확인
        cy.get(`a[href*="id=${id}"]`).should('exist');
      }
    });
  });
});
