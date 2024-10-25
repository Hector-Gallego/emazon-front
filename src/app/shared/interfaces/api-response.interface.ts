export interface ApiResponse{
    message: string,
    status: number,
    timestamp: string,
    
}

export interface ApiResponseData<T>{
    status: number,
    message: string,
    data: T,
    timestamp: string,
    
}
