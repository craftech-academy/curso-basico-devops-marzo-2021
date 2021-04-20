from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomPageNumberPagination(PageNumberPagination):
    page_size_query_param = 'limit'

    def get_paginated_response(self, data):
        return Response({
            'previous_page': self.page.previous_page_number() if self.page.has_previous() else None,
            'next_page': self.page.next_page_number() if self.page.has_next() else None,
            'current_page': self.page.number,
            'count': self.page.paginator.count,
            'results': data
        })
